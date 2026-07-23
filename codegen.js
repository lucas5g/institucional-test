const { chromium } = require('playwright');

const TOKEN = 'token';

(async () => {

  const browser = await chromium.launch({
    headless: false,
  });

  const context = await browser.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const page = await context.newPage();

  await page.goto(
    'https://dev.gerais.mg.def.br/sistemas/institucional/pessoa/cadastro'
  );

  await page.pause();
})();