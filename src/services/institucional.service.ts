import { faker } from '@faker-js/faker/locale/pt_BR'
import { generate as generateCpf } from 'gerador-validador-cpf'
import { InstitucionalRequest } from './institucional.request'

export type DescricaoVinculo = 'DEFENSOR(A)' | 'ESTÁGIO' | 'SERVIDOR(A)'

interface PreparaPayloadInterface {
  descricaoVinculo: DescricaoVinculo
  naturezaVinculo?: string
  idVinculoInstitucional: number
  idSituacaoFuncional: number
  idCargaHoraria: number
  idTurmaConcurso: number
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
    const isServidorEfetivo = dados.descricaoVinculo === 'SERVIDOR(A)'
      && dados.naturezaVinculo === 'Efetivo'
    const payload = {
      geralPessoa: {
        estadoCivil: 'Casado(a)',
        dataNascimento: '1992-11-09',
        etnia: 'Parda - Pardo',
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
      nome: faker.person.fullName(),
      flagNomeSocial: false,
      escolaridade: 'Ensino Superior',
      documentos: [
        {
          numeroDocumento: generateCpf(),
          tipoDocumento: 'CPF'
        }
      ],
      pessoaCurso: [
        {
          contrato: {
            id: isServidorEfetivo ? 54 : 147
          },
          curso: {
            id: isServidorEfetivo ? 3 : 7
          },
          grauEscolaridade: 'Ensino Superior',
          situacaoCurso: 'CONCLUIDO',
          dataConclusaoCurso: '1992-11-09'
        }
      ],
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
      dataPublicacao: '2026-07-30',
      dataAdmissaoPosse: '2026-07-30',
      dataIngressoCargoEfetivoDefensoria: '2026-07-30',
      masp: faker.string.numeric(6),
      idTurmaConcurso: dados.idTurmaConcurso,
      isEstagio: dados.descricaoVinculo === 'ESTÁGIO'
    }

    if (isServidorEfetivo) {
      return {
        ...payload,
        numeroSei: faker.string.numeric(6),
        nomeCargoServidor: 'Agente Da Defensoria Pública',
        nomeClasse: 'I',
        padrao: 'A',
        naturezaVinculo: dados.naturezaVinculo,
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

  async create(descricaoVinculo: DescricaoVinculo, naturezaVinculo?: string) {
    const vinculo = await this.getVinculoInstitucionalPelaDescricao(descricaoVinculo)

    if (!vinculo) {
      throw new Error(`Vínculo institucional não encontrado: ${descricaoVinculo}`)
    }

    const situacaoFuncional = (await this.request.situacaoFuncionalFiltros(vinculo.id))[0]
    const horario = await this.getCargaHorariaPelaDescricao('40 horas semanais')
    const turmaConcurso = await this.getFirstTurmaConcurso()

    if (!situacaoFuncional || !horario || !turmaConcurso) {
      throw new Error(`Não foi possível resolver os dados funcionais para ${descricaoVinculo}`)
    }

    const classeDefensor = (await this.request.classeDefensor())[0]

    if (!classeDefensor) {
      throw new Error(`Classe de defensor não encontrada para ${descricaoVinculo}`)
    }

    const payload = this.preparePayload({
      descricaoVinculo,
      naturezaVinculo,
      idVinculoInstitucional: vinculo.id,
      idSituacaoFuncional: situacaoFuncional.id,
      idCargaHoraria: horario.id,
      idClasseDefensor: classeDefensor?.id,
      idTurmaConcurso: turmaConcurso
    })

    return await this.request.administrarPessoaV3(payload) as {
      dados?: string
      mensagem: string
    }
  }

  async visualizar(uuid: string) {
    return this.request.administrarPessoaVisualizar(uuid)
  }
}
