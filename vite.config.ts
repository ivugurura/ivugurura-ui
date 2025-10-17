import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), ''); // load .env if needed
  const outDir = mode === 'staging' ? 'build-staging' : 'build';

  return {
    plugins: [react({ include: /.(js|jsx|ts|tsx)$/ })],
    build: { outDir },
    server: {
      port: 3000,
    },
    define: {
      // temporary shim if CRA-era code references process.env directly
      'process.env': {},
    },
  };
});
