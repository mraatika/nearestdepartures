import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import Icons from 'unplugin-icons/vite';
import { defineConfig, type PluginOption } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ command, mode }) => {
  let plugins: PluginOption[] = [
    svelte({
      hot: !process.env.VITEST,
    }),
    Icons({
      compiler: 'svelte',
    }),
  ];

  if (command === 'build') {
    plugins = plugins.concat([
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,png, svg}'],
        },
        manifest: manifestConfig,
      }),
      visualizer() as PluginOption,
    ]);
  }

  console.log(
    `Mode: ${mode}, base: ${mode === 'staging' ? '/nearestdepartures/' : '/'}`,
  );

  return {
    base: mode === 'staging' ? '/nearestdepartures/' : '/',
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
    plugins,
  };
});

const manifestConfig = {
  short_name: 'julkisilla.info',
  name: 'julkisilla.info',
  description:
    'Julkisilla.info -palvelulla löydät lähimmät Pääkaupunkiseudun julkisen liikenteen lähdöt helposti ja nopeasti. Löydät lähdöt joko osoitteella tai paikannimellä hakemalla tai käyttäen laitteen paikannusta.',
  start_url: './index.html',
  theme_color: '#007ac9',
  background_color: '#007ac9',
  display: 'standalone',
  icons: [
    {
      src: 'icons/android-launchericon-32-32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      src: 'icons/android-launchericon-48-48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      src: 'icons/android-launchericon-72-72.png',
      sizes: '72x72',
      type: 'image/png',
    },
    {
      src: 'icons/ios-appicon-76-76.png',
      sizes: '76x76',
      type: 'image/png',
    },
    {
      src: 'icons/android-launchericon-96-96.png',
      sizes: '96x96',
      type: 'image/png',
    },
    {
      src: 'icons/ios-appicon-120-120.png',
      sizes: '120x120',
      type: 'image/png',
    },
    {
      src: 'icons/ios-appicon-152-152.png',
      sizes: '152x152',
      type: 'image/png',
    },
    {
      src: 'icons/ios-appicon-180-180.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      src: 'icons/android-launchericon-192-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'icons/android-launchericon-512-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'icons/ios-appicon-1024-1024.png',
      sizes: '1024x1024',
      type: 'image/png',
    },
    {
      src: 'icons/maskable_icon.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};
