import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { mouse } from './util.tsx'

const init = document.getElementById('initButton');
const startPage = document.getElementById('initScreen');

init?.addEventListener('click', () => {
  startPage?.remove();
  appInit();
});

// needed for Firefox compatibility - https://bugzilla.mozilla.org/show_bug.cgi?id=505521
window.addEventListener('mousemove', (e: MouseEvent) => {
  mouse.x = e.screenX;
  mouse.y = e.screenY;
});

window.addEventListener('dragover', (e: DragEvent) => {
  mouse.x = e.screenX;
  mouse.y = e.screenY;
});

function appInit() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}