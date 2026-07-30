import req from 'supertest'
import { env } from '../env'
export async function login() {
  const { text } = await req(env.BASE_URL_API)
    .post('/scsdp/service/login/interno')
    .set('User-Agent', 'institucional-test')
    .send({
      cpf: env.LOGIN_CPF,
      senha: env.LOGIN_SENHA
    })
    .expect(201)

  return text
}
