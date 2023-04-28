import { App } from 'App.js';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

window.onload = () => {
    new EventSource('/esbuild').addEventListener('change', () => {
        location.reload();
    })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);