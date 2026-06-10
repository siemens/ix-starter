import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.BASE_PATH || '/',
    plugins: [vue()],
    build: {
      sourcemap: true,
    },
    server: {
      port: Number.parseInt(env.VITE_PORT || '3200'),
      open: true,
    },
  };
});
