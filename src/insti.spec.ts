import { describe, it, expect, beforeAll } from 'vitest'
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker/locale/pt_BR'
import req from 'supertest'
import { InstitucionalService } from './services/institucional.service'
import { login } from './utils/login'
import { env } from './env'

describe('Criar usuário', () => {

  let token: string
  let service: InstitucionalService
  beforeAll(async () => {
    token = await login()
    service = new InstitucionalService(token)
  })

  it.only('POST /dpmg-institucional/service/adminsitrar-pessoa/v3 DEFENSOR', async () => {

    const vinculo = await service.getVinculoInstitucionalPelaDescricao('DEFENSOR(A)');

    const situacaoFuncional = (await service.situacaoFuncionalFiltros(vinculo?.id!))[0]

    const horario = await service.getCargaHorariaPelaDescricao('40 horas semanais')

    const classeDefensor = (await service.classeDefensor())[0]

    const turmaConcurso = await service.getFirstTurmaConcurso()

    const payload = preparePayload({
      idVinculoInstitucional: vinculo?.id!,
      idSituacaoFuncional: situacaoFuncional?.id!,
      idCarcaHoraria: horario?.id!,
      idClasseDefensor: classeDefensor.id,
      idTurmaConcurso: turmaConcurso!
    })

    const { body } = await req(env.BASE_URL_API)
      .post('/dpmg-institucional/service/administrar-pessoa/v3')
      .send(payload)
      .set('Authorization', `Bearer ${token}`)

    expect(body.mensagem).toBe('Tudo certo! Registro cadastrado com sucesso.')

  })


  it.skip('POST /dpmg-institucional/service/administrar-pessoa/v3', async () => {

    const payload = {
      "geralPessoa": {
        "estadoCivil": "Casado(a)",
        "dataNascimento": "2026-07-22",
        "etnia": "Parda - Pardo",
        "sexo": "Masculino",
        "genero": "Homem cis",
        "orientacaoSexual": "Heterossexual",
        "possuiDeficiencia": false,
        "filiacoesDTO": [
          {
            "nome": "ANDREIA DOS SANTOS DIAS",
            "nivelParentesco": "Mãe",
            "sexo": "Feminino"
          }
        ]
      },
      "nome": faker.person.fullName(),
      "flagNomeSocial": false,
      "escolaridade": "Ensino Superior",
      "documentos": [
        {
          "numeroDocumento": generateCpf(),
          "tipoDocumento": "CPF"
        }
      ],
      "pessoaCurso": [
        {
          "contrato": {
            "id": 147
          },
          "curso": {
            "id": 7
          },
          "grauEscolaridade": "Ensino Superior",
          "situacaoCurso": "CONCLUIDO",
          "dataConclusaoCurso": "2026-07-23"
        }
      ],
      "enderecos": [
        {
          "cep": "30626280",
          "bairro": "Cardoso (Barreiro)",
          "logradouro": "Rua Álvaro Ferreira Cardoso",
          "numero": "215",
          "complemento": "",
          "estado": {
            "codigo": 31
          },
          "municipio": {
            "codigo": 3106200
          },
          "principal": true
        }
      ],
      "contatos": [
        {
          "contato": "CELULAR",
          "tipo": "PARTICULAR",
          "descricao": "31999999999",
          "principal": true,
          "contatoEmergencia": false,
          "principalExterno": false
        },
        {
          "contato": "TELEFONE",
          "tipo": "PARTICULAR",
          "descricao": "3198888888",
          "principal": false,
          "contatoEmergencia": true,
          "principalExterno": false,
          "observacao": "emergência"
        },
        {
          "contato": "EMAIL",
          "tipo": "PARTICULAR",
          "descricao": "test@mail.com",
          "principal": true,
          "contatoEmergencia": false
        }
      ],
      "orgaos": [],
      "setores": []
    }

    const token = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMTMyNTIwOC03ZmIzLTRhMWUtYjhhNC1mOGUyNWYzNTIxZWUiLCJ0eXBlIjoiVVNVQVJJT19JTlRFUk5PIiwiZmlzdCI6ZmFsc2UsImlhdCI6MTc4NDg0MTIxMSwiZXhwIjoxNzg0ODQ4NDExLCJqdGkiOiIxMC4yMzMuMTE0LjE1NyJ9.rB_t9TzBOwIGksHUHGFIiXgJBNmDdBQ9Aw2ZwmlLx7LJG80s5yzhDFx5cR4ytJZk'

    const vinculoInstitucional = getVinculoInstitucional()
    Object.assign(payload, vinculoInstitucional)

    console.log({ payload })

    const { body, text, status } = await req('https://dev.gerais.mg.def.br/dpmg-institucional/service/administrar-pessoa/v3')
      .post('/')
      .send(payload)
      .set('Authorization', `Bearer ${token}`)

    if (status !== 200) {
      console.log({ body, text, status })
    }
    expect(status).toBe(200)

  })



})

interface PreparaPayloadInterface {
  idVinculoInstitucional: number
  idSituacaoFuncional: number
  idCarcaHoraria: number
  idClasseDefensor: number
  idTurmaConcurso: number

}

function preparePayload(dados: PreparaPayloadInterface) {
  console.log(dados.idClasseDefensor)
  return {
    "geralPessoa": {
      "estadoCivil": "Casado(a)",
      "dataNascimento": "2026-07-22",
      "etnia": "Parda - Pardo",
      "sexo": "Masculino",
      "genero": "Homem cis",
      "orientacaoSexual": "Heterossexual",
      "possuiDeficiencia": false,
      "filiacoesDTO": [
        {
          "nome": "ANDREIA DOS SANTOS DIAS",
          "nivelParentesco": "Mãe",
          "sexo": "Feminino"
        }
      ]
    },
    "nome": faker.person.fullName(),
    "flagNomeSocial": false,
    "escolaridade": "Ensino Superior",
    "documentos": [
      {
        "numeroDocumento": generateCpf(),
        "tipoDocumento": "CPF"
      }
    ],
    "pessoaCurso": [
      {
        "contrato": {
          "id": 147
        },
        "curso": {
          "id": 7
        },
        "grauEscolaridade": "Ensino Superior",
        "situacaoCurso": "CONCLUIDO",
        "dataConclusaoCurso": "2026-07-23"
      }
    ],
    "enderecos": [
      {
        "cep": "30626280",
        "bairro": "Cardoso (Barreiro)",
        "logradouro": "Rua Álvaro Ferreira Cardoso",
        "numero": "215",
        "complemento": "",
        "estado": {
          "codigo": 31
        },
        "municipio": {
          "codigo": 3106200
        },
        "principal": true
      }
    ],
    "contatos": [
      {
        "contato": "CELULAR",
        "tipo": "PARTICULAR",
        "descricao": "31999999999",
        "principal": true,
        "contatoEmergencia": false,
        "principalExterno": false
      },
      {
        "contato": "TELEFONE",
        "tipo": "PARTICULAR",
        "descricao": "3198888888",
        "principal": false,
        "contatoEmergencia": true,
        "principalExterno": false,
        "observacao": "emergência"
      },
      {
        "contato": "EMAIL",
        "tipo": "PARTICULAR",
        "descricao": "test@mail.com",
        "principal": true,
        "contatoEmergencia": false
      }
    ],
    "orgaos": [],
    "setores": [],
    "idVinculoInstitucional": dados.idVinculoInstitucional,
    "idSituacaoFuncional": dados.idSituacaoFuncional,
    "acessaSistema": false,
    "dataInicioDPMG": "2026-07-23",
    "idCargaHoraria": dados.idCarcaHoraria,
    "dataPublicacao": "2026-07-23",
    "dataAdmissaoPosse": "2026-07-23",
    "dataIngressoCargoEfetivoDefensoria": "2026-07-23",
    "masp": "123",
    "madep": "123",
    "idTurmaConcurso": dados.idTurmaConcurso,
    "idClasseDefensor": dados.idClasseDefensor,
    "dataInicioClasse": "2026-07-23",
    "classificacaoConcurso": "10",
    "isEstagio": false,
    "lotacoes": [
      {
        "tipoAtividade": "Finalística",
        "uuidComarca": "cb7a0922-ec2c-44a5-9797-f521b5055a89",
        "uuidOrgaoAtuacao": "31a2cce8-ff47-466e-9852-90ccb1391b5f",
        "uuidOrgaoExecutor": "00ab77d4-0f7f-4184-82d9-b978af9b0223",
        "uuidInstalacaoFisica": "8dd1c3c3-023b-481d-b103-3e61a7a7e5f3",
        "situacaoAtuacao": "Atuando",
        "tipoNaturezaAtuacao": "Titular"
      }
    ],
  }


}


function getVinculoInstitucional() {
  return {
    "idVinculoInstitucional": 1,
    "idSituacaoFuncional": 217,
    "acessaSistema": false,
    "dataInicioDPMG": "2026-07-23",
    "idCargaHoraria": 7,
    "dataPublicacao": "2026-07-23",
    "dataAdmissaoPosse": "2026-07-23",
    "dataIngressoCargoEfetivoDefensoria": "2026-07-23",
    "masp": "123",
    "madep": "123",
    "idTurmaConcurso": 11,
    "idClasseDefensor": 4,
    "dataInicioClasse": "2026-07-23",
    "classificacaoConcurso": "10",
    "isEstagio": false,
    "lotacoes": [
      {
        "tipoAtividade": "Finalística",
        "uuidComarca": "cb7a0922-ec2c-44a5-9797-f521b5055a89",
        "uuidOrgaoAtuacao": "31a2cce8-ff47-466e-9852-90ccb1391b5f",
        "uuidOrgaoExecutor": "00ab77d4-0f7f-4184-82d9-b978af9b0223",
        "uuidInstalacaoFisica": "8dd1c3c3-023b-481d-b103-3e61a7a7e5f3",
        "situacaoAtuacao": "Atuando",
        "tipoNaturezaAtuacao": "Titular"
      }
    ],
  }
}