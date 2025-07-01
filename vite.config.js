import { defineConfig } from 'vite'

export default defineConfig({
  // Root directory
  root: '.',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Environment variables prefix
  envPrefix: 'VITE_',
  
  // Handle legacy browsers
  build: {
    target: 'es2015',
    polyfillModulePreload: false
  }
}) 