import req from 'supertest'

export class InstitucionalRequest {
  constructor(
    private readonly token: string,
    private readonly baseUrl: string
  ) { }

  async vinculoInstitucionalListagemOrdenada() {
    const { body } = await req(this.baseUrl)
      .get('/dpmg-institucional/service/vinculo-institucional/listagem-ordenada')
      .set('Authorization', `Bearer ${this.token}`)
      .expect(200)

    return body.dados as {
      id: number,
      descricao: string
    }[]
  }


  async cargaHoraria() {
    const { body } = await req(this.baseUrl)
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
    const { body } = await req(this.baseUrl)
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
    const { body } = await req(this.baseUrl)
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
    const { body } = await req(this.baseUrl)
      .get(`/dpmg-institucional/service/situacao-funcional/filtros?idsVinculoInstitucional=${idsVinculoInstitucional}`)
      .set('Authorization', `Bearer ${this.token}`)
      .expect(200)

    return body.dados as {
      id: number,
      nome: string
    }[]
  }


  async concursoBuscarTodosDados() {
    const { body } = await req(this.baseUrl)
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
    const { body, status, text } = await req(this.baseUrl)
      .post('/dpmg-institucional/service/administrar-pessoa/v3')
      .set('Authorization', `Bearer ${this.token}`)
      .send(payload)

    if (status < 200 || status >= 300) {
      throw new Error(`Falha ao criar pessoa (${status}): ${text || JSON.stringify(body)}`)
    }

    return body
  }

  async administrarPessoaVisualizar(uuid: string) {
    const response = await fetch(
      new URL(`/dpmg-institucional/service/administrar-pessoa/visualizar/${uuid}`, this.baseUrl),
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    )
    const text = await response.text()

    if (response.status !== 500) {
      throw new Error(`Status inesperado ao visualizar pessoa: ${response.status}`)
    }

    return text
  }
}
