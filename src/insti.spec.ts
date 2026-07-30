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
  }, 7200)

  it.skip('POST /administrar-pessoa/v3 ESTÁGIO', async () => {
    const res = await service.create('ESTÁGIO')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    const estagio = await service.visualizar(res.dados!)
    console.log(estagio)
  }, 7000)

  it('POST /administrar-pessoa/v3 SERVIDOR EFETIVO', async () => {
    const res = await service.create('SERVIDOR(A)', 'Efetivo')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST /administrar-pessoa/v3 SERVIDOR RECRUTAMENTO AMPLO', async () => {
    const res = await service.create('SERVIDOR(A)', 'Recrutamento Amplo')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST /administrar-pessoa/v3 SERVIDOR CEDIDO', async () => {
    const res = await service.create('SERVIDOR(A)', 'Cedido')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST /administrar-pessoa/v3 SERVIDOR MANDATO', async () => {
    const res = await service.create('SERVIDOR(A)', 'Mandato')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST /administrar-pessoa/v3 SERVIDOR MILITAR', async () => {
    const res = await service.create('SERVIDOR(A)', 'Militar')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)
})
