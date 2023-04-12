// eslint-disable-next-line import/no-extraneous-dependencies
import eslint from 'vite-plugin-eslint';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
