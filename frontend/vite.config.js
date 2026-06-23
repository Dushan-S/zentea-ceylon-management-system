import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      // Stub out Node.js built-in modules for browser compatibility
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
    // Define global process.env for compatibility with some libraries
    'process.env': {},
    global: 'globalThis',
  },
  
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
    exclude: ['jspdf', 'html2canvas', 'canvg'],
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
    // Increase chunk size warning limit to avoid warnings for large chunks
    chunkSizeWarningLimit: 1000,
    
    // Optimize production build
    minify: 'esbuild',
    sourcemap: false,
    
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2', 'recharts'],
          'pdf-vendor': ['jspdf', 'jspdf-autotable', 'html2canvas', 'canvg'],
          'ui-vendor': ['sweetalert2', 'lucide-react', 'react-icons'],
        },
      },
    },
    
    // Ensure compatibility with Vercel
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})