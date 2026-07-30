import { beforeAll, describe, expect, it } from 'vitest'

import { InstitucionalService } from './services/institucional.service'
import { login } from './utils/login'

describe('Criar usuário', () => {
  let service: InstitucionalService

  beforeAll(async () => {
    const token = await login()
    service = new InstitucionalService(token)
  })

  it('POST DEFENSOR', async () => {
    const res = await service.create({ descricaoVinculo: 'DEFENSOR(A)' })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7200)

  it('POST ESTÁGIO NÃO OBRIGATÓRIO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Não Obrigatório'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)

  it('POST ESTÁGIO OBRIGATÓRIO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Obrigatório'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)

  it('POST ESTÁGIO CEDIDO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Cedido'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)

  it('POST SERVIDOR EFETIVO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Efetivo'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST SERVIDOR RECRUTAMENTO AMPLO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Recrutamento Amplo'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST SERVIDOR CEDIDO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Cedido'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST SERVIDOR MANDATO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Mandato'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('POST SERVIDOR MILITAR', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Militar'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)
})
