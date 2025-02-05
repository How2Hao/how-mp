import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig(async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    plugins: [
      Components({
      dts: true,
      resolvers: [WotResolver()]
    }),
      // https://github.com/uni-helper/vite-plugin-uni-pages
    UniPages(),
      // https://github.com/uni-helper/vite-plugin-uni-layouts
    UniLayouts(),
      // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniManifest(),
      uni(),
      UnoCSS(),
    ],
    build: {
    target: 'es6',
    cssTarget: 'chrome61',
  },
  optimizeDeps: {
    exclude: [
      'vue-demi',
    ],
  },  }
})



