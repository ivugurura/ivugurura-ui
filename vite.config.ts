import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), ''); // load .env if needed
  const outDir = mode === 'staging' ? 'build-staging' : 'build';

  return {
    plugins: [
      react({ include: /\.(js|jsx|ts|tsx)$/ }),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          // enables SW in dev so you can test without a prod build
          enabled: true,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
              },
            },
          ],
          globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
        },
        manifest: {
          name: 'Reformation Voice',
          short_name: 'Reformation Voice',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#1976d2',
          icons: [
            { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
            // maskable (optional)
            {
              src: '/favicon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable any',
            },
          ],
        },
      }),
    ],
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
