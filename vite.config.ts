/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';
import { configDefaults } from 'vitest/dist/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  base: '/todo/',
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    exclude: [...configDefaults.exclude, 'instrumented'],
    coverage: {
      provider: 'istanbul',
    },
    env: {
      VITE_BASE_URL: 'http://localhost:5173/todo',
      VITE_API_URL: 'api-url-test',
      VITE_LS_NAME_SETTINGS: 'ot-settings',
      VITE_LS_NAME_COLLECTIONS: 'ot-collections',
      VITE_LS_NAME_ITEMS: 'ot-items',
      VITE_LS_NAME_NOTES: 'ot-notes',
    },
  },
  preview: {
    port: 5173,
  },
});
