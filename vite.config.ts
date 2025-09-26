import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      external: (id) => {
        // Don't bundle platform-specific binaries
        if (id.includes('@rollup/rollup-')) return true;
        return false;
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            if (id.includes('@tanstack') || id.includes('@supabase')) {
              return 'data';
            }
            if (id.includes('lucide-react') || id.includes('recharts')) {
              return 'icons-charts';
            }
            return 'vendor';
          }
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@tanstack/react-query',
      'react-router-dom',
      'clsx',
      'class-variance-authority'
    ],
    exclude: ['lovable-tagger', 'minimatch'],
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
}));
