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
          return '/gateway/models/GPT-5.5/1qt9ydB-r452Q0EB2MNsPjFWmVQsQbx5FeTACI_Ux3ODSeoV969dUtVXjO0iImecjYwdWUIFCYUWdSJ7tu-eZQpN6eWFE4gpYvfwzhpCe_xpnszip3tg5Iwkf-W5jVMmixUahYju3wmxS7-kRzPq6kUy-NJvViM2khY6urFaJbuvTMcHMMYtK6jx_3Qcx1yTXP97hMyEbqOu--B9DV_0_wI4-nwloyhqV0GJyuwspJ8H-LnN/v1/chat/completions';
        },
        headers: {
          'Authorization': 'Bearer 8d210f7c-eac0-5c67-a3f0-b61e37f62179'
        }
      }
    }
  }
})