import req from 'supertest'
import { env } from '../env'

export class InstitucionalRequest {
  constructor(private readonly token: string) { }

  async vinculoInstitucionalListagemOrdenada() {
    const { body } = await req(env.BASE_URL_API)
      .get('/dpmg-institucional/service/vinculo-institucional/listagem-ordenada')
      .set('Authorization', `Bearer ${this.token}`)
      .expect(200)

    return body.dados as {
      id: number,
      descricao: string
    }[]
  }


  async cargaHoraria() {
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

  async turmaPosseBuscarTurmaIdConcurso(id: number) {
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

  async administrarPessoaV3(payload: Object) {
    const { body } = await req(env.BASE_URL_API)
      .post('/dpmg-institucional/service/administrar-pessoa/v3')
      .set('Authorization', `Bearer ${this.token}`)
      .send(payload)


    return body
  }

  async administrarPessoaVisualizar(uuid: string) {
    console.log('uuid => ', uuid)

    const { text } = await req(env.BASE_URL_API)
      .get(`/dpmg-institucional/service/administrar-pessoa/visualizar/${uuid}`)
      ///dpmg-institucional/service/administrar-pessoa/visualizar/605a0c83-c1d2-4ef7-a2d4-ac33cce253b7
      .set('Authorization', `Bearer ${this.token}`)
      .expect(500)

    console.log({ text })
    return text
  }
}   