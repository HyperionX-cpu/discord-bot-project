import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext'

// Provide global default configuration so no component crashes on window.DASHBOARD_CONFIG access
window.DASHBOARD_CONFIG = window.DASHBOARD_CONFIG || {
    API_URL: '/api',
    CLIENT_URL: window.location.origin,
    TIMEZONE: 'America/Chicago',
    DISCORD: {
        CLIENT_ID: '1535999829506007070',
        REDIRECT_URI: `${window.location.origin}/api/auth/callback`,
        GUILD_ID: '1527850448696905818'
    },
    TICKETS: {
        TYPES: {}
    },
    PERMISSIONS: {
        Dashboard: {
            Login: [],
            Usage: [],
            Settings: []
        }
    }
};

const rootElement = document.getElementById('root');

if (rootElement) {
    rootElement.removeAttribute('aria-hidden');
}

ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)