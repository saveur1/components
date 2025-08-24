/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    Pages({ dirs:'src/app', extensions: ['tsx', 'ts'] }),
],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
})
