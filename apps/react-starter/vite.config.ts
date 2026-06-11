import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.BASE_PATH || '/',
    plugins: [react()],
    build: {
      sourcemap: true,
    },
    server: {
      port: Number.parseInt(env.VITE_PORT || '3000'),
      open: true,
    },
  };
});
