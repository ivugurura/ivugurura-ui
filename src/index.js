import React from 'react';

import { createRoot } from 'react-dom/client';

import 'react-h5-audio-player/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import App from './App';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);
