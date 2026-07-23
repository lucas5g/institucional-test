# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src/test.spec.ts >> Criar usuário
- Location: src/test.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- main [ref=e5]:
  - main [ref=e7]:
    - generic [ref=e9]:
      - link "Institucional" [ref=e11] [cursor=pointer]:
        - /url: /sistemas/institucional/
        - generic [ref=e12]: home
        - text: Institucional
      - generic [ref=e13]: "-"
      - link "Administrar Pessoas" [ref=e15] [cursor=pointer]:
        - /url: /sistemas/institucional/pessoa/gerenciar
      - generic [ref=e16]: "-"
      - generic [ref=e18]: Cadastrar Pessoa
    - generic [ref=e19]:
      - generic [ref=e21]:
        - paragraph [ref=e22]: FORMULÁRIO
        - button "Fechar" [ref=e24] [cursor=pointer]:
          - generic [ref=e26]: Fechar
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30] [cursor=pointer]:
            - generic [ref=e32]: check
            - generic [ref=e33]: Dados Pessoais
          - generic [ref=e34] [cursor=pointer]:
            - generic [ref=e36]: check
            - generic [ref=e37]: Grupo Familiar
          - generic [ref=e38] [cursor=pointer]:
            - generic [ref=e40]: check
            - generic [ref=e41]: Dados de Ensino
          - generic [ref=e42] [cursor=pointer]:
            - generic [ref=e44]: check
            - generic [ref=e45]: Contato
          - generic [ref=e46] [cursor=pointer]:
            - generic [ref=e48]: check
            - generic [ref=e49]: Endereço
          - generic [ref=e50] [cursor=pointer]:
            - generic [ref=e52]: "6"
            - generic [ref=e53]: Dados Funcionais
          - generic [ref=e54] [cursor=pointer]:
            - generic [ref=e56]: "7"
            - generic [ref=e57]: Lotação
        - generic [ref=e58]:
          - generic [ref=e59]:
            - alert [ref=e61]:
              - generic [ref=e65]: "Nome: Teste 1"
            - text:                 
            - generic [ref=e67]:
              - generic [ref=e68]: Os campos marcados com * são obrigatórios.
              - generic [ref=e69]:
                - generic [ref=e74]:
                  - generic [ref=e75]:
                    - generic [ref=e76]:
                      - generic [ref=e77]: DEFENSOR(A)
                      - combobox "Vínculo Institucional *" [ref=e78]
                    - generic: Vínculo Institucional *
                  - button "Limpar" [ref=e80] [cursor=pointer]: close
                  - generic [ref=e82] [cursor=pointer]: arrow_drop_down
                - generic [ref=e88]:
                  - generic [ref=e89]:
                    - generic [ref=e90]:
                      - generic [ref=e91]: TESTE SITUAÇÃO FUNCIONAL MARCUS
                      - combobox "Situação Funcional *" [ref=e92]
                    - generic: Situação Funcional *
                  - button "Limpar" [ref=e94] [cursor=pointer]: close
                  - generic [ref=e96] [cursor=pointer]: arrow_drop_down
              - generic [ref=e98]: Dados de Ingresso
              - generic [ref=e99]:
                - generic [ref=e104]:
                  - generic [ref=e105]:
                    - textbox "Data Início na DPMG *" [ref=e106]: 31/12/2025
                    - generic: Data Início na DPMG *
                  - button "Limpar" [ref=e108] [cursor=pointer]: close
                  - generic [ref=e110] [cursor=pointer]: event
                - generic [ref=e116]:
                  - generic [ref=e117]:
                    - textbox "Data de Nomeação *" [ref=e118]: 05/04/2026
                    - generic: Data de Nomeação *
                  - button "Limpar" [ref=e120] [cursor=pointer]: close
                  - generic [ref=e122] [cursor=pointer]: event
                - generic [ref=e128]:
                  - generic [ref=e129]:
                    - textbox "Data de Admissão/Posse *" [ref=e130]: 08/05/2026
                    - generic: Data de Admissão/Posse *
                  - button "Limpar" [ref=e132] [cursor=pointer]: close
                  - generic [ref=e134] [cursor=pointer]: event
                - generic [ref=e140]:
                  - generic [ref=e141]:
                    - textbox "Data de Ingresso em Cargo Efetivo na DPMG *" [ref=e142]: 06/07/2026
                    - generic: Data de Ingresso em Cargo Efetivo na DPMG *
                  - button "Limpar" [ref=e144] [cursor=pointer]: close
                  - generic [ref=e146] [cursor=pointer]: event
                - generic [ref=e153]:
                  - textbox "SEI" [ref=e154]
                  - generic: SEI
              - generic [ref=e156]: Dados de Registro
              - generic [ref=e157]:
                - checkbox "Cotista" [ref=e160] [cursor=pointer]:
                  - img [ref=e163]
                  - generic [ref=e165]: Cotista
                - checkbox "Possui Acesso ao Gerais" [ref=e168] [cursor=pointer]:
                  - img [ref=e171]
                  - generic [ref=e173]: Possui Acesso ao Gerais
              - generic [ref=e174]:
                - generic [ref=e179]:
                  - generic [ref=e180]:
                    - textbox "MASP *" [ref=e181]: "123"
                    - generic: MASP *
                  - button "Limpar" [ref=e183] [cursor=pointer]: close
                - generic [ref=e189]:
                  - generic [ref=e190]:
                    - textbox "MADEP *" [ref=e191]: "123"
                    - generic: MADEP *
                  - button "Limpar" [ref=e193] [cursor=pointer]: close
              - generic [ref=e195]:
                - generic [ref=e197]:
                  - generic [ref=e202]:
                    - generic [ref=e203]:
                      - generic [ref=e204]:
                        - generic [ref=e205]: 40 horas semanais
                        - combobox "Carga Horária de Trabalho *" [ref=e206]
                      - generic: Carga Horária de Trabalho *
                    - button "Limpar" [ref=e208] [cursor=pointer]: close
                    - generic [ref=e210] [cursor=pointer]: arrow_drop_down
                  - button [ref=e213] [cursor=pointer]:
                    - img [ref=e215]: +
                - generic [ref=e221]:
                  - textbox "Matrícula Folha" [ref=e222]
                  - generic: Matrícula Folha
              - generic [ref=e224]:
                - generic [ref=e228]:
                  - generic [ref=e229]:
                    - generic [ref=e230]:
                      - combobox "Classe *" [ref=e232]
                      - generic: Classe *
                    - generic [ref=e234] [cursor=pointer]: arrow_drop_down
                  - alert [ref=e237]: Classe é um campo obrigatório
                - generic [ref=e242]:
                  - generic [ref=e243]:
                    - textbox "Data de Início na Classe *" [ref=e244]: 24/09/2025
                    - generic: Data de Início na Classe *
                  - button "Limpar" [ref=e246] [cursor=pointer]: close
                  - generic [ref=e248] [cursor=pointer]: event
                - generic [ref=e254]:
                  - generic [ref=e255]:
                    - textbox "Classificação no Concurso *" [ref=e256]: "10"
                    - generic: Classificação no Concurso *
                  - button "Limpar" [ref=e258] [cursor=pointer]: close
                - generic [ref=e264]:
                  - generic [ref=e265]:
                    - generic [ref=e266]:
                      - generic [ref=e267]: CONCURSO NÚMERO 1 TESTE
                      - combobox "Concurso *" [ref=e268]
                    - generic: Concurso *
                  - button "Limpar" [ref=e270] [cursor=pointer]: close
                  - generic [ref=e272] [cursor=pointer]: arrow_drop_down
                - generic [ref=e277]:
                  - generic [ref=e278]:
                    - generic [ref=e279]:
                      - combobox "Turma *" [active] [ref=e281]
                      - generic: Turma *
                    - generic [ref=e283] [cursor=pointer]: arrow_drop_down
                  - alert [ref=e286]: Turma é um campo obrigatório
              - generic [ref=e287]: Observação Funcional
              - textbox [ref=e295]
          - generic [ref=e297]:
            - button "Voltar" [ref=e298] [cursor=pointer]:
              - generic [ref=e299]:
                - img [ref=e300]: 
                - generic [ref=e301]: Voltar
            - button "Avançar" [ref=e302] [cursor=pointer]:
              - generic [ref=e303]:
                - generic [ref=e304]: Avançar
                - img [ref=e305]: 
```

# Test source

```ts
  66  |   await page.getByRole('option', { name: 'Masculino' }).click();
  67  |   await page.getByRole('textbox', { name: 'Data de Nascimento' }).fill(birthdate);
  68  |   await page.getByRole('button', { name: 'CONFIRMAR' }).click();
  69  |   await page.getByRole('button', { name: 'Avançar' }).click();
  70  | 
  71  |   /** Dados de Ensino */
  72  |   await page.getByRole('button', { name: 'Novo' }).click();
  73  |   await page.getByRole('combobox', { name: 'Nível do Curso *' }).click();
  74  |   await page.locator('div').filter({ hasText: /^Ensino Superior$/ }).nth(4).click();
  75  |   await page.locator('div').filter({ hasText: /^Curso \*$/ }).first().click();
  76  |   await page.locator('span').filter({ hasText: /^Sistemas de Informação$/ }).click();
  77  |   await page.getByRole('combobox', { name: 'Instituição de Ensino *' }).click();
  78  |   await page.getByRole('option').nth(2).click();
  79  |   await page.getByRole('combobox', { name: 'Situação do Curso *' }).click();
  80  |   await page.locator('div').filter({ hasText: 'Concluído' }).nth(5).click();
  81  |   await page.getByRole('textbox', { name: 'Data de Previsão/Colação de' }).fill(faker.date.future({ years: 1 }).toLocaleDateString('pt-BR'));
  82  |   await page.getByRole('button', { name: 'Confirmar' }).click();
  83  |   await page.getByRole('button', { name: 'Avançar' }).click();
  84  | 
  85  |   /**
  86  |    * Contato
  87  |    */
  88  |   await page.getByRole('button', { name: 'Novo' }).click();
  89  |   await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  90  |   await page.locator('div').filter({ hasText: 'Celular' }).nth(4).click();
  91  |   await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  92  |   await page.getByRole('option', { name: 'Particular' }).click();
  93  |   await page.getByRole('textbox', { name: 'Descrição' }).fill('(31) 99999-9999');
  94  |   await page.getByRole('checkbox', { name: 'Contato Principal' }).click();
  95  |   await page.getByRole('button', { name: 'Confirmar' }).click();
  96  | 
  97  |   await page.getByRole('button', { name: 'Novo' }).click();
  98  |   await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  99  |   await page.getByRole('option', { name: 'E-mail' }).click();
  100 |   await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  101 |   await page.getByRole('option', { name: 'Particular' }).click();
  102 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('teste1@mail.com');
  103 |   await page.getByRole('checkbox', { name: 'Contato Principal' }).click();
  104 |   await page.getByRole('button', { name: 'Confirmar' }).click();
  105 | 
  106 |   await page.getByRole('button', { name: 'Novo' }).click();
  107 |   await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  108 |   await page.getByRole('option', { name: 'Celular' }).click();
  109 |   await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  110 |   await page.getByRole('option', { name: 'Particular' }).click();
  111 |   await page.getByRole('checkbox', { name: 'Contato de Emergência' }).click();
  112 |   await page.getByRole('textbox', { name: 'Descrição' }).fill('(32) 99999-9999');
  113 |   await page.getByRole('textbox', { name: 'Nome do Contato' }).fill('emergência');
  114 |   await page.getByRole('button', { name: 'Confirmar' }).click();
  115 |   await page.getByRole('button', { name: 'Avançar' }).click();
  116 | 
  117 |   /**
  118 |    * Endereço
  119 |    */
  120 |   await page.getByRole('button', { name: 'Novo' }).click();
  121 |   await page.getByRole('textbox', { name: 'CEP *' }).fill('30.575-120');
  122 |   await expect.poll(() =>
  123 |     page.locator('input, textarea').evaluateAll(
  124 |       (fields, expectedValue) => fields.some(
  125 |         field => (field as HTMLInputElement | HTMLTextAreaElement).value === expectedValue,
  126 |       ),
  127 |       'Rua Stella Hanriot',
  128 |     ),
  129 |   ).toBe(true);
  130 |   await page.getByRole('textbox', { name: 'Número *' }).fill('201');
  131 |   await page.getByRole('button', { name: 'Confirmar' }).click();
  132 |   await page.getByRole('button', { name: 'Avançar' }).click();
  133 | 
  134 | 
  135 |   /**
  136 |    * Dados Funcionais
  137 |    */
  138 | 
  139 |   await page.getByRole('combobox', { name: 'Vínculo Institucional *' }).click();
  140 |   await page.locator('div').filter({ hasText: 'DEFENSOR(A)' }).nth(4).click();
  141 | 
  142 |   await page.waitForTimeout(1000)
  143 |   await page.getByRole('combobox', { name: 'Situação Funcional *' }).click();
  144 |   await page.getByRole('option').nth(1).click();
  145 |   await page.getByRole('textbox', { name: 'Data Início na DPMG *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  146 |   await page.getByRole('textbox', { name: 'Data de Nomeação *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  147 |   await page.getByRole('textbox', { name: 'Data de Admissão/Posse *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  148 |   await page.getByRole('textbox', { name: 'Data de Ingresso em Cargo Efetivo na DPMG *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  149 |   await page.getByRole('textbox', { name: 'MASP *' }).fill('123');
  150 |   await page.getByRole('textbox', { name: 'MADEP *' }).fill('123');
  151 |   await page.getByRole('combobox', { name: 'Carga Horária de Trabalho *' }).click();
  152 |   await page.locator('div').filter({ hasText: '40 horas semanais' }).nth(4).click();
  153 | 
  154 |   // await page.getByRole('button', { name: 'Avançar' }).click();
  155 | 
  156 |   await page.getByRole('combobox', { name: 'Classe *' }).click();
  157 |   await page.getByRole('option').first().click();
  158 |   await page.getByRole('textbox', { name: 'Data de Início na Classe *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  159 |   await page.getByRole('textbox', { name: 'Classificação no Concurso *' }).fill('10');
  160 |   await page.getByRole('combobox', { name: 'Concurso *' }).click();
  161 |   await page.getByRole('option', { name: 'CONCURSO NÚMERO 1 TESTE'}).click();
  162 |   await page.getByRole('combobox', { name: 'Turma *' }).click();
  163 |   await page.getByRole('option').last().click();
  164 |   await page.getByRole('button', { name: 'Avançar' }).click();
  165 | 
> 166 |   await page.waitForTimeout(10_000)
      |              ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  167 |   await page.close()
  168 |   return
  169 | 
  170 | 
  171 | 
  172 | 
  173 | 
  174 | 
  175 |   await page.getByText('event').nth(5).click();
  176 |   await page.getByRole('button', { name: '22' }).click();
  177 |   await page.getByRole('textbox', { name: 'Classificação no Concurso *' }).click();
  178 | 
  179 | 
  180 |   await page.getByRole('button', { name: 'Avançar' }).click();
  181 |   await page.getByRole('button', { name: 'Novo' }).click();
  182 |   await page.locator('div').filter({ hasText: /^Tipo de Atividade \*$/ }).first().click();
  183 |   await page.getByRole('option', { name: 'Finalística' }).click();
  184 |   await page.getByRole('combobox', { name: 'Natureza da Atuação *' }).click();
  185 |   await page.getByRole('option', { name: 'Titular' }).click();
  186 |   await page.locator('div').filter({ hasText: /^Situação da Atividade \*$/ }).first().click();
  187 |   await page.getByRole('option', { name: 'Atuando' }).click();
  188 |   await page.getByRole('combobox', { name: 'Unidade *' }).click();
  189 |   await page.locator('div').filter({ hasText: /^Belo Horizonte$/ }).nth(2).click();
  190 |   await page.getByRole('combobox', { name: 'Órgão de Atuação *' }).click();
  191 |   await page.locator('div').filter({ hasText: 'ª Defensoria Cível' }).nth(5).click();
  192 |   await page.getByRole('combobox', { name: 'Órgão de Execução *' }).click();
  193 |   await page.locator('div').filter({ hasText: 'Órgão de Execução 1' }).nth(5).click();
  194 |   await page.locator('div').filter({ hasText: /^Instalação Física \*$/ }).first().click();
  195 |   await page.locator('div').filter({ hasText: 'Nova Instalação' }).nth(5).click();
  196 |   await page.getByRole('button', { name: 'Confirmar' }).click();
  197 |   await page.getByRole('button', { name: 'Finalizar' }).click();
  198 |   await page.getByRole('button', { name: 'Cancelar' }).click();
  199 |   await page.getByText('checkDados Pessoais').click();
  200 |   await page.locator('div:nth-child(8) > div > .DPMG-field > .q-field > .q-field__inner > .q-field__control > .q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip > .q-icon').first().click();
  201 |   await page.getByRole('textbox', { name: 'RG' }).fill('020214545456465');
  202 |   await page.getByRole('combobox', { name: 'Órgão Emissor *' }).click();
  203 |   await page.getByText('Polícia Civil').click();
  204 |   await page.getByRole('combobox', { name: 'Estado Emissor *' }).click();
  205 |   await page.getByRole('combobox', { name: 'Estado Emissor *' }).fill('mg');
  206 |   await page.locator('div').filter({ hasText: /^MG$/ }).nth(5).click();
  207 |   await page.getByRole('button', { name: 'Avançar' }).click();
  208 |   await page.getByRole('button', { name: 'Avançar' }).click();
  209 |   await page.getByRole('button', { name: 'Avançar' }).click();
  210 |   await page.getByRole('button', { name: 'Avançar' }).click();
  211 |   await page.getByRole('button', { name: 'Avançar' }).click();
  212 |   await page.getByRole('button', { name: 'Finalizar' }).click();
  213 |   await page.getByRole('button', { name: 'Não' }).click();
  214 |   await page.getByText('LISTAGEM').click();
  215 | });
  216 | 
```