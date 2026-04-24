import { defineConfig } from 'vitest/config';

const isMinify = process.env.MINIFY === 'true';

export default defineConfig({
  // Disable Oxc to avoid warnings when explicitly configuring esbuild
  oxc: false,
  esbuild: {
    minifyIdentifiers: isMinify,
    minifySyntax: isMinify,
    minifyWhitespace: isMinify,
    legalComments: 'none',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Signals',
      formats: ['es'],
      fileName: () => isMinify ? 'index.min.js' : 'index.js',
    },
    minify: isMinify ? 'esbuild' : false,
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: !isMinify,
  },
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    environment: 'node',
    reporters: 'default',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts'],
    },
  },
});
