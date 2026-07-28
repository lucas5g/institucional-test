import req from 'supertest'
import { env } from '../env'
export async function login() {
  const { text } = await req(env.BASE_URL_API)
    .post('/service/scsdp/login/interno')
    .send({ data: env.LOGIN_DATA })
    .expect(201)

  return text;
}