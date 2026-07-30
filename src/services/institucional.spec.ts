import { beforeAll, describe, expect, it } from 'vitest'

import { InstitucionalService } from './institucional.service'
import { login } from '../utils/login'
import { env } from '../env'

describe('VÍNCULOS SEM NATUREZA', () => {
  let service: InstitucionalService

  beforeAll(async () => {
    const token = await login()
    service = new InstitucionalService(token, env.BASE_URL_API)
  })

  it('CRIAR DEFENSOR', async () => {
    const res = await service.create({ descricaoVinculo: 'DEFENSOR(A)' })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7200)

  it('CRIAR EXTENSIONISTA', async () => {
    const res = await service.create({ descricaoVinculo: 'EXTENSIONISTA' })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    const visualizar = await service.visualizar(res.dados!)
    expect(visualizar).toContain('Exception')
  }, 7000)

  it('CRIAR RESIDENTE', async () => {
    const res = await service.create({ descricaoVinculo: 'RESIDENTE' })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    const visualizar = await service.visualizar(res.dados!)
    expect(visualizar).toContain('Exception')
  }, 7000)

  it('CRIAR SERVIÇO VOLUNTÁRIO', async () => {
    const res = await service.create({ descricaoVinculo: 'SERVIÇO VOLUNTÁRIO' })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('CRIAR FORNECEDOR/TERCEIRIZADO', async () => {
    const res = await service.create({
      descricaoVinculo: 'FORNECEDOR(A)/TERCEIRIZADO(A)'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)
})

describe('ESTÁGIO', () => {
  let service: InstitucionalService

  beforeAll(async () => {
    const token = await login()
    service = new InstitucionalService(token, env.BASE_URL_API)
  })

  it('CRIAR NÃO OBRIGATÓRIO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Não Obrigatório'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)

  it('CRIAR OBRIGATÓRIO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Obrigatório'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)

  it('CRIAR CEDIDO', async () => {
    const res = await service.create({
      descricaoVinculo: 'ESTÁGIO',
      naturezaVinculo: 'Cedido'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
    await service.visualizar(res.dados!)
  }, 10000)
})

describe('SERVIDOR(A)', () => {
  let service: InstitucionalService

  beforeAll(async () => {
    const token = await login()
    service = new InstitucionalService(token, env.BASE_URL_API)
  })

  it('CRIAR EFETIVO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Efetivo'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('CRIAR RECRUTAMENTO AMPLO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Recrutamento Amplo'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('CRIAR CEDIDO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Cedido'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('CRIAR MANDATO', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Mandato'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)

  it('CRIAR MILITAR', async () => {
    const res = await service.create({
      descricaoVinculo: 'SERVIDOR(A)',
      naturezaVinculo: 'Militar'
    })

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')
    expect(res.dados).toBeTruthy()
  }, 7000)
})
