import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/gpt': {
          target: env.VITE_AI_PROXY_TARGET,
          changeOrigin: true,
          rewrite: () => env.VITE_AI_PROXY_PATH,
          headers: {
            'Authorization': `Bearer ${env.VITE_AI_API_KEY}`
          }
        }
      }
    }
  }
})
