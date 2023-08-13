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
  base: '/todo-demo/',
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    exclude: [...configDefaults.exclude, 'instrumented'],
    coverage: {
      provider: 'istanbul',
    },
    env: {
      VITE_API_URL: 'test',
      VITE_LS_NAME_TODOS: 'test-todos',
      VITE_LS_NAME_SETTINGS: 'test-settings',
    },
  },
  preview: {
    port: 5173,
  },
});
