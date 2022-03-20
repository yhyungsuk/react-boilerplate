import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace'

export default defineConfig({
  plugins: [
    react(),
    replace({
      delimiters: ['', ''],
      preventAssignment: false,
      "'/___service_backend___'":
        "import.meta.env.MODE === 'production' || import.meta.env.MODE === 'stage' ? import.meta.env.VITE_BACKEND_BASE_URL : '/___service_backend___'",
    }),
    replace({
      delimiters: ['', ''],
      preventAssignment: false,
      "'___running_mode___'": 'import.meta.env.MODE',
    }),
  ],
  build: {
    minify: 'esbuild',
  },
  server: {
    open: true,
    host: true,
    proxy: {
      '/___service_backend___': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/___service_backend___/, ''),
      },
    },
  },
})
