import { registerArgosTask } from '@argos-ci/cypress/task';
import coverage from '@cypress/code-coverage/task.js';
import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin.js';
import cypressSplit from 'cypress-split';
import 'dotenv/config';

export default defineConfig({
  projectId: 'n2sma2',
  viewportWidth: 1440,
  viewportHeight: 1024,
  e2e: {
    baseUrl: `http://localhost:${process.env.MERMAID_PORT ?? 9000}`,
    specPattern: 'cypress/integration/**/*.{js,ts}',
    setupNodeEvents(on, config) {
      coverage(on, config);
      cypressSplit(on, config);
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--window-size=1440,1024', '--force-device-scale-factor=1');
        }
        return launchOptions;
      });
      config.env.useArgos = process.env.RUN_VISUAL_TEST === 'true';

      if (config.env.useArgos) {
        registerArgosTask(on, config, {
          uploadToArgos: !!process.env.CI,
        });
      } else {
        addMatchImageSnapshotPlugin(on, config);
      }
      return config;
    },
  },
  video: false,
});
