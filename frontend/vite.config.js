import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      child_process: false,
      util: false,
      stream: false,
      buffer: false,
      process: false,
      tty: false,
      zlib: false,
      http: false,
      https: false,
      url: false,
      net: false,
      tls: false,
      dns: false,
    },
  },
  
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'localhost', 
      '127.0.0.1', 
      '172.20.10.2', 
      '9f4287672efa.ngrok-free.app', 
      'bd3b8d572dfb.ngrok-free.app'
    ],
  },
  
  build: {
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    
    rollupOptions: {
      // මෙය ඉතා වැදගත්: Node.js මොඩියුල බ්‍රව්සරයට බලෙන් ඇතුල් කිරීම වළක්වයි
      external: [
        'fs', 'path', 'os', 'crypto', 'child_process', 'util', 'stream', 
        'buffer', 'process', 'tty', 'zlib', 'http', 'https', 'url', 'net', 'tls', 'dns'
      ],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2', 'recharts'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable', 'html2canvas', 'canvg'],
          'ui-vendor': ['sweetalert2', 'lucide-react', 'react-icons'],
        },
      },
    },
    
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})