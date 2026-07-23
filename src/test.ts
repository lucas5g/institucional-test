import { expect, test } from 'playwright/test';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { login, getCpf } from './util';
import { format } from 'date-fns';

test('Criar usuário', async ({ page }) => {


  const token = await login(page);
  const cpf = await getCpf(token);

  const birthdate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }));


  await page.goto('https://dev.gerais.mg.def.br/sistemas/institucional/pessoa/cadastro');

  /**
   * Dados Pessoais
   */

  console.log({ cpf })

  await page.getByRole('textbox', { name: 'CPF *' }).fill(cpf);
  await page.getByRole('textbox', { name: 'Nome *' }).fill('Teste 1');
  await page.getByRole('textbox', { name: 'Data de Nascimento *' }).fill(birthdate);
  await page.locator('div').filter({ hasText: /^Estado Civil \*$/ }).first().click();
  await page.locator('div').filter({ hasText: 'Casado(a)' }).nth(4).click();
  await page.getByRole('combobox', { name: 'Escolaridade *' }).click();
  await page.locator('div').filter({ hasText: 'Ensino Superior' }).nth(4).click();
  await page.getByRole('combobox', { name: 'Cor/Raça' }).click();
  await page.locator('div').filter({ hasText: 'Parda - Pardo' }).nth(4).click();
  await page.getByRole('combobox', { name: 'Sexo' }).click();
  await page.getByText('Masculino').click();

  await page.locator('.row.q-col-gutter-x-md.q-px-md > div:nth-child(3) > .DPMG-field > .q-field > .q-field__inner > .q-field__control > .q-field__control-container').click();
  await page.locator('div').filter({ hasText: 'Homem cis' }).nth(5).click();

  await page.locator('div:nth-child(4) > .DPMG-field > .q-field > .q-field__inner > .q-field__control > .q-field__control-container').click();
  await page.locator('div').filter({ hasText: 'Heterossexual' }).nth(4).click();
  await page.getByRole('textbox', { name: 'RG' }).fill('14426271');

  await page.getByRole('combobox', { name: 'Órgão Emissor *' }).click();
  await page.getByText('Polícia Civil').click();

  await page.getByRole('combobox', { name: 'Estado Emissor *' }).click();
  await page.locator('div').filter({ hasText: 'MG' }).nth(5).click();
  await page.getByRole('textbox', { name: 'PIS/PASEP' }).fill('977.74584.25-7');

  await page.getByRole('button', { name: 'Avançar' }).click();

  /**
   * Grupo Familiar
   */


  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('textbox', { name: 'Nome *' }).fill('pai 1');
  await page.locator('div').filter({ hasText: /^Grau de Parentesco \*$/ }).first().click();
  await page.locator('div').filter({ hasText: 'Pai' }).nth(5).click();
  await page.getByRole('combobox', { name: 'Sexo *' }).click();
  await page.getByRole('option', { name: 'Masculino' }).click();
  await page.getByRole('textbox', { name: 'Data de Nascimento' }).fill(birthdate);
  await page.getByRole('button', { name: 'CONFIRMAR' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();

  /** Dados de Ensino */
  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('combobox', { name: 'Nível do Curso *' }).click();
  await page.locator('div').filter({ hasText: /^Ensino Superior$/ }).nth(4).click();
  await page.locator('div').filter({ hasText: /^Curso \*$/ }).first().click();
  await page.locator('span').filter({ hasText: /^Sistemas de Informação$/ }).click();
  await page.getByRole('combobox', { name: 'Instituição de Ensino *' }).click();
  await page.getByRole('option').nth(2).click();
  await page.getByRole('combobox', { name: 'Situação do Curso *' }).click();
  await page.locator('div').filter({ hasText: 'Concluído' }).nth(5).click();
  await page.getByRole('textbox', { name: 'Data de Previsão/Colação de' }).fill(faker.date.future({ years: 1 }).toLocaleDateString('pt-BR'));
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();

  /**
   * Contato
   */
  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  await page.locator('div').filter({ hasText: 'Celular' }).nth(4).click();
  await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  await page.getByRole('option', { name: 'Particular' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('(31) 99999-9999');
  await page.getByRole('checkbox', { name: 'Contato Principal' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();

  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  await page.getByRole('option', { name: 'E-mail' }).click();
  await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  await page.getByRole('option', { name: 'Particular' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('teste1@mail.com');
  await page.getByRole('checkbox', { name: 'Contato Principal' }).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();

  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('combobox', { name: 'Contato *', exact: true }).click();
  await page.getByRole('option', { name: 'Celular' }).click();
  await page.getByRole('combobox', { name: 'Tipo de Contato *' }).click();
  await page.getByRole('option', { name: 'Particular' }).click();
  await page.getByRole('checkbox', { name: 'Contato de Emergência' }).click();
  await page.getByRole('textbox', { name: 'Descrição' }).fill('(32) 99999-9999');
  await page.getByRole('textbox', { name: 'Nome do Contato' }).fill('emergência');
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();

  /**
   * Endereço
   */
  await page.getByRole('button', { name: 'Novo' }).click();
  await page.getByRole('textbox', { name: 'CEP *' }).fill('30.575-120');
  await expect.poll(() =>
    page.locator('input, textarea').evaluateAll(
      (fields, expectedValue) => fields.some(
        field => (field as HTMLInputElement | HTMLTextAreaElement).value === expectedValue,
      ),
      'Rua Stella Hanriot',
    ),
  ).toBe(true);
  await page.getByRole('textbox', { name: 'Número *' }).fill('201');
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();


  /**
   * Dados Funcionais
   */

  await page.getByRole('combobox', { name: 'Vínculo Institucional *' }).click();
  await page.locator('div').filter({ hasText: 'DEFENSOR(A)' }).nth(4).click();

  await page.waitForTimeout(1000)
  await page.getByRole('combobox', { name: 'Situação Funcional *' }).click();
  await page.getByRole('option').nth(1).click();
  await page.getByRole('textbox', { name: 'Data Início na DPMG *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  await page.getByRole('textbox', { name: 'Data de Nomeação *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  await page.getByRole('textbox', { name: 'Data de Admissão/Posse *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  await page.getByRole('textbox', { name: 'Data de Ingresso em Cargo Efetivo na DPMG *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  await page.getByRole('textbox', { name: 'MASP *' }).fill('123');
  await page.getByRole('textbox', { name: 'MADEP *' }).fill('123');
  await page.getByRole('combobox', { name: 'Carga Horária de Trabalho *' }).click();
  await page.locator('div').filter({ hasText: '40 horas semanais' }).nth(4).click();

  // await page.getByRole('button', { name: 'Avançar' }).click();

  await page.getByRole('combobox', { name: 'Classe *' }).click();
  await page.getByRole('option').first().click();
  await page.getByRole('textbox', { name: 'Data de Início na Classe *' }).fill(faker.date.past({ refDate: new Date() }).toLocaleDateString('pt-BR'));
  await page.getByRole('textbox', { name: 'Classificação no Concurso *' }).fill('10');
  await page.getByRole('combobox', { name: 'Concurso *' }).click();
  await page.getByRole('option', { name: 'CONCURSO NÚMERO 1 TESTE'}).click();
  await page.getByRole('combobox', { name: 'Turma *' }).click();
  await page.getByRole('option').last().click();
  await page.getByRole('button', { name: 'Avançar' }).click();

  await page.waitForTimeout(10_000)
  await page.close()
  return






  await page.getByText('event').nth(5).click();
  await page.getByRole('button', { name: '22' }).click();
  await page.getByRole('textbox', { name: 'Classificação no Concurso *' }).click();


  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Novo' }).click();
  await page.locator('div').filter({ hasText: /^Tipo de Atividade \*$/ }).first().click();
  await page.getByRole('option', { name: 'Finalística' }).click();
  await page.getByRole('combobox', { name: 'Natureza da Atuação *' }).click();
  await page.getByRole('option', { name: 'Titular' }).click();
  await page.locator('div').filter({ hasText: /^Situação da Atividade \*$/ }).first().click();
  await page.getByRole('option', { name: 'Atuando' }).click();
  await page.getByRole('combobox', { name: 'Unidade *' }).click();
  await page.locator('div').filter({ hasText: /^Belo Horizonte$/ }).nth(2).click();
  await page.getByRole('combobox', { name: 'Órgão de Atuação *' }).click();
  await page.locator('div').filter({ hasText: 'ª Defensoria Cível' }).nth(5).click();
  await page.getByRole('combobox', { name: 'Órgão de Execução *' }).click();
  await page.locator('div').filter({ hasText: 'Órgão de Execução 1' }).nth(5).click();
  await page.locator('div').filter({ hasText: /^Instalação Física \*$/ }).first().click();
  await page.locator('div').filter({ hasText: 'Nova Instalação' }).nth(5).click();
  await page.getByRole('button', { name: 'Confirmar' }).click();
  await page.getByRole('button', { name: 'Finalizar' }).click();
  await page.getByRole('button', { name: 'Cancelar' }).click();
  await page.getByText('checkDados Pessoais').click();
  await page.locator('div:nth-child(8) > div > .DPMG-field > .q-field > .q-field__inner > .q-field__control > .q-field__append.q-field__marginal.row.no-wrap.items-center.q-anchor--skip > .q-icon').first().click();
  await page.getByRole('textbox', { name: 'RG' }).fill('020214545456465');
  await page.getByRole('combobox', { name: 'Órgão Emissor *' }).click();
  await page.getByText('Polícia Civil').click();
  await page.getByRole('combobox', { name: 'Estado Emissor *' }).click();
  await page.getByRole('combobox', { name: 'Estado Emissor *' }).fill('mg');
  await page.locator('div').filter({ hasText: /^MG$/ }).nth(5).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Avançar' }).click();
  await page.getByRole('button', { name: 'Finalizar' }).click();
  await page.getByRole('button', { name: 'Não' }).click();
  await page.getByText('LISTAGEM').click();
});
