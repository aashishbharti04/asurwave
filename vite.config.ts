/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

/**
 * Vite configuration.
 *
 * `base` is configurable through the `BASE_PATH` environment variable so the
 * same build works whether the site is served from a domain root (`/`) or from
 * a project sub-path such as GitHub Pages (`/<repo>/`). The deploy workflow sets
 * this automatically; local dev and preview default to `/`.
 */
export default defineConfig({
  base: process.env.BASE_PATH || '/',

  build: {
    target: 'es2022',
    cssMinify: true,
    sourcemap: false,
    // Fail the build if a single chunk grows unexpectedly large.
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Stable, cache-friendly, content-hashed asset names.
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },

  test: {
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.ts'],
    globals: false,
    restoreMocks: true,
  },
});
