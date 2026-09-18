/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    // Vitest stubs every *.css import — including `?raw` — to '' unless included.
    // The guardrail test reads ProviderCard.css as text, so it must be real.
    css: { include: [/ProviderCard\.css/] },
  },
});
