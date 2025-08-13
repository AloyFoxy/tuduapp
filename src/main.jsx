import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { I18nProvider } from '@lingui/react'
import { i18n } from '@lingui/core'
import { activateLocale, getInitialLocale } from './i18n/activate.js'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

await activateLocale(getInitialLocale())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
