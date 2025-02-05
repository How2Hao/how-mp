import { fileURLToPath, URL } from 'node:url'

import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      Components({
        dts: true,
        resolvers: [WotResolver()],
        directoryAsNamespace: true,
      }),
      // https://github.com/uni-helper/vite-plugin-uni-pages
      UniPages(),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
      UniLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-manifest
      UniManifest(),
      uni(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores', 'src/utils'],
        vueTemplate: true,
      }),
      UnoCSS(),
    ],
  }
})
