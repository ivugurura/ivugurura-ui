import path from 'path';

import reactSWC from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

const resolvePath = (p: string) => path.resolve(__dirname, p);

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), ''); // load .env if needed
  const outDir = mode === 'staging' ? 'build-staging' : 'build';

  return {
    plugins: [reactSWC()],
    build: { outDir },
    server: {
      port: 3000,
    },
    define: {
      // temporary shim if CRA-era code references process.env directly
      'process.env': {},
    },
    resolve: {
      alias: {
        '@redux/actions': resolvePath('src/redux/actions.ts'),
        '@redux/store': resolvePath('src/redux/store.ts'),
      },
    },
  };
});
