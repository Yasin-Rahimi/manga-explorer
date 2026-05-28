import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/gpt': {
        target: 'https://arvancloudai.ir',
        changeOrigin: true,
        rewrite: (path) => {
          return '/gateway/models/GPT-4o/SSLCJImpvtAXNeRe7x8F2J9Kuf5ZwAxyYOmBPDffmK4xx6cZ2bTu5unIGM-mmliSyabmlsfsgJIZ2kMuibZB_N2iqJh8WsW_mPlOlYIOPHgJBxMZ1M1NoaGTPKsrHPqu-cHuRGR8UV91Qa-b_fOKluByJTAIG6SC9rM_pOgVMHuqVSq9Wo8qYQyS-UZMJYq-kw0XZAZFCnzgKSqt9dsnZl2AEOc4RCRAyubMx6Q23EbAAw/v1/chat/completions';
        },
        headers: {
          'Authorization': 'Bearer 8d210f7c-eac0-5c67-a3f0-b61e37f62179'
        }
      }
    }
  }
})