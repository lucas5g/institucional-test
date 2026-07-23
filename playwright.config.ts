import { defineConfig } from 'playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },
});
