
import { InstitucionalRequest } from './institucional.request'
import { generate as generateCpf } from 'gerador-validador-cpf'
import { faker } from '@faker-js/faker/locale/pt_BR'

interface PreparaPayloadInterface {
  idVinculoInstitucional: number
  idSituacaoFuncional: number
  idCarcaHoraria: number
  idClasseDefensor: number
  idTurmaConcurso: number
  isEstagio: boolean
}

export class InstitucionalService {
  private readonly request: InstitucionalRequest

  constructor(token: string) {
    this.request = new InstitucionalRequest(token)
  }

  async getFirstTurmaConcurso() {
    const concursos = await this.request.concursoBuscarTodosDados()
    for (const concurso of concursos) {
      const turmas = await this.request.turmaPosseBuscarTurmaIdConcurso(concurso.id)
      if (turmas.length) {
        return turmas[0].id
      }
    }
  }

  async getCargaHorariaPelaDescricao(descricao: string) {
    const res = await this.request.cargaHoraria()
    return res.find(row => row.descricaoCargaHoraria === descricao)
  }

  async getVinculoInstitucionalPelaDescricao(descricao: string) {
    const res = await this.request.vinculoInstitucionalListagemOrdenada()
    return res.find(row => row.descricao === descricao)
  }


  private preparePayload(dados: PreparaPayloadInterface) {
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
      "isEstagio": dados.isEstagio,
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

  async create(nomeVinculo: string) {

    const vinculo = await this.getVinculoInstitucionalPelaDescricao(nomeVinculo);

    const situacaoFuncional = (await this.request.situacaoFuncionalFiltros(vinculo?.id!))[0]

    const horario = await this.getCargaHorariaPelaDescricao('40 horas semanais')

    const classeDefensor = (await this.request.classeDefensor())[0]

    const turmaConcurso = await this.getFirstTurmaConcurso()

    const payload = this.preparePayload({
      idVinculoInstitucional: vinculo?.id!,
      idSituacaoFuncional: situacaoFuncional.id,
      idCarcaHoraria: horario?.id!,
      idClasseDefensor: classeDefensor.id,
      idTurmaConcurso: turmaConcurso!,
      isEstagio: vinculo?.descricao.includes('ESTÁGIO')!
    })

    return await this.request.administrarPessoaV3(payload) as {
      dados: string,
      mensagem: string
    }

  }

  async visualizar(uuid: string) {
    return this.request.administrarPessoaVisualizar(uuid)
  }
}