// src/i18n/activate.js
import { i18n } from '@lingui/core'

// Nota: esta ruta es RELATIVA a este archivo (está en /src/i18n)
// Por eso subimos un nivel: ../locales/**/messages.po
const catalogs = import.meta.glob('../locales/**/messages.po')

export async function activateLocale(locale) {
  // Busca la key exacta que generó Vite con el glob
  const key = Object.keys(catalogs).find(k => k.endsWith(`/${locale}/messages.po`))
  if (!key) throw new Error(`[i18n] Missing catalog for ${locale}`)
  const loader = catalogs[key]
  const { messages } = await loader()
  i18n.load(locale, messages)
  i18n.activate(locale)
  localStorage.setItem('lang', locale)
}

export function getInitialLocale() {
  return localStorage.getItem('lang') || 'es'
}