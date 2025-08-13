import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { lingui } from '@lingui/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {
        'macros': true
      }]]
    }),
    tailwindcss(),
    lingui()
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
