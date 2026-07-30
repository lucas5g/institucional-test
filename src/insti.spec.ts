import { beforeAll, describe, expect, it } from 'vitest'

import { InstitucionalService } from './services/institucional.service'
import { login } from './utils/login'

describe('Criar usuário', () => {
  let service: InstitucionalService

  beforeAll(async () => {
    const token = await login()
    service = new InstitucionalService(token)
  })

  it('POST /administrar-pessoa/v3 DEFENSOR', async () => {
    const res = await service.create('DEFENSOR(A)')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST /administrar-pessoa/v3 ESTÁGIO', async () => {
    const res = await service.create('ESTÁGIO')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it.only('POST /administrar-pessoa/v3 SERVIDOR EFETIVO', async () => {
    const res = await service.create('SERVIDOR(A)', 'Efetivo')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)
})
