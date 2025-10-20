import { registerSW } from 'virtual:pwa-register';

export const registerPWA = () =>
  registerSW({
    onNeedRefresh() {
      // Called when a new SW is available; reload to get it
      // You could show a toast/button instead of auto-reload
      // updateSW(true) would reload; here we just log
      console.log('New version available. Refresh to update.');
    },
    onOfflineReady() {
      console.log('App ready to work offline.');
    },
  });
