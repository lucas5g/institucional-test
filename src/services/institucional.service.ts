import { faker } from '@faker-js/faker/locale/pt_BR'
import { generate as generateCpf } from 'gerador-validador-cpf'
import { InstitucionalRequest } from './institucional.request'

export const NATUREZAS_VINCULO_SERVIDOR = [
  'Efetivo',
  'Recrutamento Amplo',
  'Cedido',
  'Mandato',
  'Militar'
] as const

export const NATUREZAS_VINCULO_ESTAGIO = [
  'Não Obrigatório',
  'Obrigatório',
  'Cedido'
] as const

export type NaturezaVinculoServidor = typeof NATUREZAS_VINCULO_SERVIDOR[number]
export type NaturezaVinculoEstagio = typeof NATUREZAS_VINCULO_ESTAGIO[number]

export type CreateInput =
  | {
    descricaoVinculo: 'SERVIDOR(A)'
    naturezaVinculo: NaturezaVinculoServidor
  }
  | {
    descricaoVinculo: 'ESTÁGIO'
    naturezaVinculo: NaturezaVinculoEstagio
  }
  | {
    descricaoVinculo: 'DEFENSOR(A)'
  }
  | {
    descricaoVinculo: 'EXTENSIONISTA'
  }
  | {
    descricaoVinculo: 'RESIDENTE'
  }
  | {
    descricaoVinculo: 'SERVIÇO VOLUNTÁRIO'
  }

interface CreateResponse {
  dados?: string
  mensagem: string
}

interface PreparaPayloadInterface {
  input: CreateInput
  idVinculoInstitucional: number
  idSituacaoFuncional: number
  idCargaHoraria: number
  idTurmaConcurso?: number
  idClasseDefensor?: number
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
    const { input } = dados
    const naturezaVinculo = 'naturezaVinculo' in input
      ? input.naturezaVinculo
      : undefined
    const dadosPessoaisPorVinculo: Record<
      CreateInput['descricaoVinculo'],
      { dataNascimento: string, etnia: string }
    > = {
      'DEFENSOR(A)': { dataNascimento: '1992-11-09', etnia: 'Parda - Pardo' },
      'ESTÁGIO': { dataNascimento: '1995-08-17', etnia: 'Parda - Pardo' },
      'SERVIDOR(A)': { dataNascimento: '1992-11-09', etnia: 'Parda - Pardo' },
      EXTENSIONISTA: { dataNascimento: '2026-07-30', etnia: 'Parda - Pardo' },
      RESIDENTE: { dataNascimento: '2022-11-09', etnia: 'Amarela - Amarelo' },
      'SERVIÇO VOLUNTÁRIO': { dataNascimento: '2022-11-09', etnia: 'Amarela - Amarelo' }
    }
    const dadosCursoPorVinculo: Partial<Record<
      CreateInput['descricaoVinculo'],
      { idContrato: number, idCurso: number, dataConclusaoCurso: string }
    >> = {
      'DEFENSOR(A)': { idContrato: 147, idCurso: 7, dataConclusaoCurso: '1992-11-09' },
      'SERVIDOR(A)': { idContrato: 54, idCurso: 3, dataConclusaoCurso: '1992-11-09' },
      EXTENSIONISTA: { idContrato: 54, idCurso: 3, dataConclusaoCurso: '2026-07-30' }
    }
    const dadosPessoais = dadosPessoaisPorVinculo[input.descricaoVinculo]
    const dadosCurso = dadosCursoPorVinculo[input.descricaoVinculo]
    const pessoaCurso = dadosCurso
      ? [
        {
          contrato: {
            id: dadosCurso.idContrato
          },
          curso: {
            id: dadosCurso.idCurso
          },
          grauEscolaridade: 'Ensino Superior',
          situacaoCurso: 'CONCLUIDO',
          dataConclusaoCurso: dadosCurso.dataConclusaoCurso
        }
      ]
      : []
    const payload = {
      geralPessoa: {
        estadoCivil: 'Casado(a)',
        dataNascimento: dadosPessoais.dataNascimento,
        etnia: dadosPessoais.etnia,
        sexo: 'Masculino',
        genero: 'Homem cis',
        orientacaoSexual: 'Heterossexual',
        possuiDeficiencia: false,
        filiacoesDTO: [
          {
            nome: 'ANDREIA DOS SANTOS DIAS',
            nivelParentesco: 'Mãe',
            sexo: 'Feminino'
          }
        ]
      },
      nome: [
        faker.person.firstName(),
        input.descricaoVinculo,
        naturezaVinculo
      ].filter(Boolean).join(' '),
      flagNomeSocial: false,
      escolaridade: 'Ensino Superior',
      documentos: [
        {
          numeroDocumento: generateCpf(),
          tipoDocumento: 'CPF'
        }
      ],
      pessoaCurso,
      enderecos: [
        {
          cep: '30626280',
          bairro: 'Cardoso (Barreiro)',
          logradouro: 'Rua Álvaro Ferreira Cardoso',
          numero: '215',
          complemento: '',
          estado: {
            codigo: 31
          },
          municipio: {
            codigo: 3106200
          },
          principal: true
        }
      ],
      contatos: [
        {
          contato: 'CELULAR',
          tipo: 'PARTICULAR',
          descricao: '31999999999',
          principal: true,
          contatoEmergencia: false,
          principalExterno: false
        },
        {
          contato: 'TELEFONE',
          tipo: 'PARTICULAR',
          descricao: '3198888888',
          principal: false,
          contatoEmergencia: true,
          principalExterno: false,
          observacao: 'emergência'
        },
        {
          contato: 'EMAIL',
          tipo: 'PARTICULAR',
          descricao: faker.internet.email(),
          principal: true,
          contatoEmergencia: false
        }
      ],
      orgaos: [],
      setores: [],
      idVinculoInstitucional: dados.idVinculoInstitucional,
      idSituacaoFuncional: dados.idSituacaoFuncional,
      acessaSistema: false,
      dataInicioDPMG: '2026-07-30',
      idCargaHoraria: dados.idCargaHoraria,
      isEstagio: input.descricaoVinculo === 'ESTÁGIO'
    }

    if (input.descricaoVinculo === 'ESTÁGIO') {
      return {
        ...payload,
        dataInicioDPMG: '2026-06-21',
        dataConvocacaoEstagio: '2027-06-30',
        dataTerminoEstagio: '2028-06-30',
        emailSupervisor: 'marcus.fernandes@defensoria.mg.def.br',
        tipoEstagio: input.naturezaVinculo,
        modalidadeEstagio: 'Graduação',
        lotacoes: [
          {
            tipoAtividade: 'Administrativa',
            uuidComarca: 'cb7a0922-ec2c-44a5-9797-f521b5055a89',
            uuidSetor: '2a03cca8-52f5-41f1-bd42-db50f7a19b2b',
            uuidInstalacaoFisica: '8dd1c3c3-023b-481d-b103-3e61a7a7e5f3',
            idOcupacao: 2
          }
        ]
      }
    }

    const dadosVinculosSupervisionados: Partial<Record<
      CreateInput['descricaoVinculo'],
      {
        dataInicioDPMG: string
        dataConvocacaoEstagio: string
        dataTerminoEstagio: string
      }
    >> = {
      EXTENSIONISTA: {
        dataInicioDPMG: '2026-07-30',
        dataConvocacaoEstagio: '2026-06-30',
        dataTerminoEstagio: '2026-08-30'
      },
      RESIDENTE: {
        dataInicioDPMG: '2026-07-29',
        dataConvocacaoEstagio: '2026-07-30',
        dataTerminoEstagio: '2026-07-31'
      },
      'SERVIÇO VOLUNTÁRIO': {
        dataInicioDPMG: '2026-07-29',
        dataConvocacaoEstagio: '2026-07-30',
        dataTerminoEstagio: '2026-07-31'
      }
    }
    const dadosVinculoSupervisionado = dadosVinculosSupervisionados[input.descricaoVinculo]

    if (dadosVinculoSupervisionado) {

      return {
        ...payload,
        ...dadosVinculoSupervisionado,
        emailSupervisor: 'marcus.fernandes@defensoria.mg.def.br',
        lotacoes: [
          {
            tipoAtividade: 'Administrativa',
            uuidComarca: 'cb7a0922-ec2c-44a5-9797-f521b5055a89',
            uuidSetor: '2a03cca8-52f5-41f1-bd42-db50f7a19b2b',
            uuidInstalacaoFisica: '8dd1c3c3-023b-481d-b103-3e61a7a7e5f3',
            idOcupacao: 2
          }
        ]
      }
    }

    const dadosFuncionaisCargo = {
      dataPublicacao: '2026-07-30',
      dataAdmissaoPosse: '2026-07-30',
      dataIngressoCargoEfetivoDefensoria: '2026-07-30',
      masp: faker.string.numeric(6),
      idTurmaConcurso: dados.idTurmaConcurso
    }

    if (input.descricaoVinculo === 'SERVIDOR(A)') {
      return {
        ...payload,
        ...dadosFuncionaisCargo,
        numeroSei: faker.string.numeric(6),
        nomeCargoServidor: 'Agente Da Defensoria Pública',
        nomeClasse: 'I',
        padrao: 'A',
        naturezaVinculo: input.naturezaVinculo,
        lotacoes: [
          {
            tipoAtividade: 'Administrativa',
            uuidComarca: 'cb7a0922-ec2c-44a5-9797-f521b5055a89',
            uuidSetor: '2a03cca8-52f5-41f1-bd42-db50f7a19b2b',
            uuidInstalacaoFisica: '8dd1c3c3-023b-481d-b103-3e61a7a7e5f3',
            idOcupacao: 2
          }
        ]
      }
    }

    return {
      ...payload,
      ...dadosFuncionaisCargo,
      madep: faker.string.numeric(6),
      idClasseDefensor: dados.idClasseDefensor,
      dataInicioClasse: '2026-07-30',
      classificacaoConcurso: '10',
      lotacoes: [
        {
          tipoAtividade: 'Finalística',
          uuidComarca: 'cb7a0922-ec2c-44a5-9797-f521b5055a89',
          uuidOrgaoAtuacao: '31a2cce8-ff47-466e-9852-90ccb1391b5f',
          uuidOrgaoExecutor: '00ab77d4-0f7f-4184-82d9-b978af9b0223',
          uuidInstalacaoFisica: '8dd1c3c3-023b-481d-b103-3e61a7a7e5f3',
          situacaoAtuacao: 'Atuando',
          tipoNaturezaAtuacao: 'Titular'
        }
      ]
    }
  }

  async create(input: CreateInput): Promise<CreateResponse> {
    const vinculo = await this.getVinculoInstitucionalPelaDescricao(input.descricaoVinculo)

    if (!vinculo) {
      throw new Error(`Vínculo institucional não encontrado: ${input.descricaoVinculo}`)
    }

    const situacaoFuncional = (await this.request.situacaoFuncionalFiltros(vinculo.id))[0]
    const horario = await this.getCargaHorariaPelaDescricao('40 horas semanais')

    if (!situacaoFuncional || !horario) {
      throw new Error(`Não foi possível resolver os dados funcionais para ${input.descricaoVinculo}`)
    }

    let idTurmaConcurso: number | undefined
    let idClasseDefensor: number | undefined

    if (input.descricaoVinculo === 'DEFENSOR(A)'
      || input.descricaoVinculo === 'SERVIDOR(A)') {
      idTurmaConcurso = await this.getFirstTurmaConcurso()

      if (!idTurmaConcurso) {
        throw new Error(`Turma de concurso não encontrada para ${input.descricaoVinculo}`)
      }
    }

    if (input.descricaoVinculo === 'DEFENSOR(A)') {
      idClasseDefensor = (await this.request.classeDefensor())[0]?.id

      if (!idClasseDefensor) {
        throw new Error(`Classe de defensor não encontrada para ${input.descricaoVinculo}`)
      }
    }

    const payload = this.preparePayload({
      input,
      idVinculoInstitucional: vinculo.id,
      idSituacaoFuncional: situacaoFuncional.id,
      idCargaHoraria: horario.id,
      idTurmaConcurso,
      idClasseDefensor
    })

    return await this.request.administrarPessoaV3(payload) as CreateResponse
  }

  async visualizar(uuid: string) {
    return this.request.administrarPessoaVisualizar(uuid)
  }
}
