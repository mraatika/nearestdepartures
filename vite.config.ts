import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig, type PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3001,
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
    VitePWA(),
    visualizer() as PluginOption,
  ],
});
