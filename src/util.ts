import type { Page } from 'playwright';
import { generate as generateCpf } from 'gerador-validador-cpf';


const LOGIN_URL = 'https://dev.gerais.mg.def.br/service/scsdp/login/interno';
const LOGIN_DATA = '';

export async function login(page: Page): Promise<string> {
  const response = await page.request.post(LOGIN_URL, {
    data: { data: LOGIN_DATA },
  });
  const responseToken = (await response.text()).trim();

  if (!response.ok()) {
    throw new Error(`Falha no login (${response.status()}): ${responseToken}`);
  }

  if (!responseToken) {
    throw new Error('O login foi realizado, mas a resposta não contém um token.');
  }

  const token = responseToken.startsWith('Bearer ')
    ? responseToken
    : `Bearer ${responseToken}`;

  await page.context().setExtraHTTPHeaders({
    Authorization: token,
  });

  return token;
}

export const cpfs = [
  '106.898.355-82',
  '036.657.127-34',
   '036.027.169-37'
]

export async function getCpf(token: string) {
  const cpf = generateCpf({ format: true });

// 10689835582
  const res = await fetch(`https://dev.gerais.mg.def.br/scsdp/service/b-cadastro/${cpf}`, {
    headers: {
      Authorization: token
    }
  })

  const data = await res.json()

  if(data.nomeContribuinte) {
    return getCpf(token)
  }

  return cpf;

}

export async function vinculoInstitucionalListagemOrdenada(){

}