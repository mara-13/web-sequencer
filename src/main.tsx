import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

const init = document.getElementById('initButton');
const startPage = document.getElementById('initScreen');

init?.addEventListener('click', () => {
  startPage?.remove();
  appInit();
});

function appInit() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}