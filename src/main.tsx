import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import 'react-h5-audio-player/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'suneditor/dist/css/suneditor.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import App from './App';
import { registerPWA } from './pwa';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register the PWA service worker (no-op in unsupported browsers)
registerPWA();
