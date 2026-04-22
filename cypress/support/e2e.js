// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support';

// Visual testing (applitools/argos) is only wired up in the plugin side when
// RUN_VISUAL_TEST === 'true' (see cypress.config.ts). Load the matching
// browser-side commands only then; otherwise they attempt to call back into
// plugin tasks that were never registered and crash the spec runner with
// "Cannot read properties of undefined (reading 'failCypressAfterAllSpecs')".
if (Cypress.env('useArgos')) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@applitools/eyes-cypress/commands');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@argos-ci/cypress/support');
}

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
