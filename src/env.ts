import { config } from 'dotenv'
import { z } from 'zod'

const testEnv = z.enum(['dev', 'hml']).parse(process.env.TEST_ENV)
const envFile = `.env.${testEnv}`
const result = config({ path: envFile, quiet: true })

if (result.error) {
  throw new Error(`Não foi possível carregar o arquivo ${envFile}`, {
    cause: result.error
  })
}

export const env = z.object({
  BASE_URL_API: z.string(),
  LOGIN_CPF: z.string(),
  LOGIN_SENHA: z.string()
}).parse(process.env)
