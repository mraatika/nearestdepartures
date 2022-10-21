import { defineConfig, type PluginOption } from 'vite';
import Icons from 'unplugin-icons/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    svelte({
      hot: !process.env.VITEST,
    }),
    Icons({
      compiler: 'svelte',
    }),
    visualizer() as PluginOption,
  ],
});
