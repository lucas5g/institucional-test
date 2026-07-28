import req from 'supertest'
import { env } from '../env'

export class InstitucionalService {
  // private token: string
  // private baseUrl: string

  constructor(private readonly token: string) { }



  private async vinculoInstitucionalListagemOrdenada() {
    const { body } = await req(env.BASE_URL_API)
      .get('/dpmg-institucional/service/vinculo-institucional/listagem-ordenada')
      .set('Authorization', `Bearer ${this.token}`)
      .expect(200)

    return body.dados as {
      id: number,
      descricao: string
    }[]
  }

  private async cargaHoraria() {
    const { body } = await req(env.BASE_URL_API)
      .get('/dpmg-institucional/service/carga-horaria')
      .set('Authorization', `Bearer ${this.token}`)

    return body.dados as [
      {
        id: number,
        descricaoCargaHoraria: string
      }
    ]
  }

  async concursoBuscarTodosDados() {
    const { body } = await req(env.BASE_URL_API)
      .get('/dpmg-institucional/service/concurso/buscar-todos-dados')
      .set('Authorization', `Bearer ${this.token}`)

    return body as [
      {
        id: number,
        descricaoConcursoPublico: string
      }
    ]
  }

  private async turmaPosseBuscarTurmaIdConcurso(id: number) {
    const { body } = await req(env.BASE_URL_API)
      .get(`/dpmg-institucional/service/turma-posse/busca-turma-id-concurso/${id}`)
      .set('Authorization', `Bearer ${this.token}`)

    return body as [
      {
        id: number,
        nomeTurma: string
      }
    ]
  }

  async getFirstTurmaConcurso() {
    const concursos = await this.concursoBuscarTodosDados()
    for (const concurso of concursos) {
      console.log(concurso.id)
      const turmas = await this.turmaPosseBuscarTurmaIdConcurso(concurso.id)
      if (turmas.length) {
        return turmas[0].id
      }
    }

  }

  async classeDefensor() {
    const { body } = await req(env.BASE_URL_API)
      .get('/dpmg-institucional/service/classe-defensor')
      .set('Authorization', `Bearer ${this.token}`)

    return body.dados as [
      {
        id: number,
        nome: string
      }
    ]
  }

  async getCargaHorariaPelaDescricao(descricao: string) {
    const res = await this.cargaHoraria()
    return res.find(row => row.descricaoCargaHoraria === descricao)
  }


  async getVinculoInstitucionalPelaDescricao(descricao: string) {
    const res = await this.vinculoInstitucionalListagemOrdenada()
    return res.find(row => row.descricao === descricao)
  }

  async situacaoFuncionalFiltros(idsVinculoInstitucional: number) {
    const { body } = await req(env.BASE_URL_API)
      .get(`/dpmg-institucional/service/situacao-funcional/filtros?idsVinculoInstitucional=${idsVinculoInstitucional}`)
      .set('Authorization', `Bearer ${this.token}`)
      .expect(200)

    return body.dados as {
      id: number,
      nome: string
    }[]
  }




}