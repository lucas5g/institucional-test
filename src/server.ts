import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { resolve } from 'node:path'

import { parse } from 'dotenv'
import { z, ZodError } from 'zod'

import {
  InstitucionalService,
  NATUREZAS_VINCULO_ESTAGIO,
  NATUREZAS_VINCULO_SERVIDOR,
  type CreateInput
} from './services/institucional.service'

const PORT = Number(process.env.PORT ?? 8888)
const SESSION_TTL = 8 * 60 * 60 * 1000
const INDEX_PATH = resolve(process.cwd(), 'index.html')

const environmentSchema = z.enum(['dev', 'hml'])
const environmentFileSchema = z.object({
  BASE_URL_API: z.string().url()
})
const loginSchema = z.object({
  ambiente: environmentSchema,
  cpf: z.string().transform(value => value.replace(/\D/g, '')).pipe(z.string().length(11)),
  senha: z.string().min(1)
})
const createInputSchema = z.discriminatedUnion('descricaoVinculo', [
  z.object({
    descricaoVinculo: z.literal('SERVIDOR(A)'),
    naturezaVinculo: z.enum(NATUREZAS_VINCULO_SERVIDOR)
  }).strict(),
  z.object({
    descricaoVinculo: z.literal('ESTÁGIO'),
    naturezaVinculo: z.enum(NATUREZAS_VINCULO_ESTAGIO)
  }).strict(),
  z.object({ descricaoVinculo: z.literal('DEFENSOR(A)') }).strict(),
  z.object({ descricaoVinculo: z.literal('EXTENSIONISTA') }).strict(),
  z.object({ descricaoVinculo: z.literal('RESIDENTE') }).strict(),
  z.object({ descricaoVinculo: z.literal('SERVIÇO VOLUNTÁRIO') }).strict(),
  z.object({ descricaoVinculo: z.literal('FORNECEDOR(A)/TERCEIRIZADO(A)') }).strict()
])

type Environment = z.infer<typeof environmentSchema>

interface Session {
  token: string
  baseUrl: string
  ambiente: Environment
  expiresAt: number
}

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message)
  }
}

const sessions = new Map<string, Session>()

function sendJson(response: ServerResponse, status: number, data: unknown) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  })
  response.end(JSON.stringify(data))
}

async function readJson(request: IncomingMessage) {
  let body = ''

  for await (const chunk of request) {
    body += chunk
    if (body.length > 20_000) {
      throw new HttpError(413, 'Corpo da requisição muito grande.')
    }
  }

  try {
    return JSON.parse(body || '{}') as unknown
  } catch {
    throw new HttpError(400, 'JSON inválido.')
  }
}

async function getEnvironment(ambiente: Environment) {
  try {
    const content = await readFile(resolve(process.cwd(), `.env.${ambiente}`), 'utf8')
    return environmentFileSchema.parse(parse(content))
  } catch (error) {
    if (error instanceof ZodError) {
      throw new HttpError(500, `BASE_URL_API inválida em .env.${ambiente}.`)
    }
    throw new HttpError(500, `Não foi possível carregar .env.${ambiente}.`)
  }
}

async function authenticate(baseUrl: string, cpf: string, senha: string) {
  const response = await fetch(new URL('/scsdp/service/login/interno', baseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'institucional-web'
    },
    body: JSON.stringify({ cpf, senha })
  })
  const token = (await response.text()).trim()

  if (response.status !== 201 || !token) {
    throw new HttpError(401, 'CPF ou senha inválidos para o ambiente selecionado.')
  }

  return token
}

function getSession(request: IncomingMessage) {
  const sessionId = request.headers['x-session-id']

  if (typeof sessionId !== 'string') {
    throw new HttpError(401, 'Sessão não informada.')
  }

  const session = sessions.get(sessionId)
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(sessionId)
    throw new HttpError(401, 'Sessão expirada. Entre novamente.')
  }

  session.expiresAt = Date.now() + SESSION_TTL
  return { sessionId, session }
}

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
  const url = new URL(request.url ?? '/', 'http://localhost')

  if (request.method === 'GET' && url.pathname === '/') {
    const html = await readFile(INDEX_PATH)
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:"
    })
    response.end(html)
    return
  }

  if (request.method === 'GET' && url.pathname === '/api/session') {
    const { session } = getSession(request)
    sendJson(response, 200, { ambiente: session.ambiente })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/login') {
    const credentials = loginSchema.parse(await readJson(request))
    const environment = await getEnvironment(credentials.ambiente)
    const token = await authenticate(environment.BASE_URL_API, credentials.cpf, credentials.senha)
    const sessionId = randomUUID()

    sessions.set(sessionId, {
      token,
      baseUrl: environment.BASE_URL_API,
      ambiente: credentials.ambiente,
      expiresAt: Date.now() + SESSION_TTL
    })
    sendJson(response, 201, { sessionId, ambiente: credentials.ambiente })
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/usuarios') {
    const { session } = getSession(request)
    const input = createInputSchema.parse(await readJson(request)) as CreateInput
    const service = new InstitucionalService(session.token, session.baseUrl)
    const result = await service.create(input)

    sendJson(response, 201, result)
    return
  }

  if (request.method === 'POST' && url.pathname === '/api/logout') {
    const { sessionId } = getSession(request)
    sessions.delete(sessionId)
    response.writeHead(204)
    response.end()
    return
  }

  if (request.method === 'GET' && url.pathname === '/favicon.ico') {
    response.writeHead(204)
    response.end()
    return
  }

  throw new HttpError(404, 'Rota não encontrada.')
}

const server = createServer((request, response) => {
  void handleRequest(request, response).catch(error => {
    if (error instanceof HttpError) {
      sendJson(response, error.status, { erro: error.message })
      return
    }

    if (error instanceof ZodError) {
      sendJson(response, 400, { erro: 'Dados inválidos.', detalhes: error.issues })
      return
    }

    const message = error instanceof Error ? error.message : 'Erro interno.'
    sendJson(response, 500, { erro: message })
  })
})

const cleanup = setInterval(() => {
  const now = Date.now()
  for (const [sessionId, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(sessionId)
  }
}, 60_000)
cleanup.unref()

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Institucional disponível em http://localhost:${PORT}`)
})
