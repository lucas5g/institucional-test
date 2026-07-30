import { describe, it, expect, beforeAll } from 'vitest'

import { InstitucionalService } from './services/institucional.service'
import { login } from './utils/login'

describe('Criar usuário', () => {

  let token: string
  let service: InstitucionalService
  beforeAll(async () => {
    token = await login()
    service = new InstitucionalService(token)
  })

  it('POST /adminsitrar-pessoa/v3 DEFENSOR', async () => {

    const res = await service.create('DEFENSOR(A)')


    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')

  }, 7000)

  it.only('POST /adminsitrar-pessoa/v3 ESTÁGIO', async () => {

    const res = await service.create('ESTÁGIO')

    expect(res.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')

    const visualizar = await service.visualizar(res.dados!)
    console.log('visualizar => ', visualizar)



  }, 7000)


})

