import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const config = defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), './src'),
        '@assets': resolve(process.cwd(), './src/assets'),
        '@components': resolve(process.cwd(), './src/components'),
        '@lib': resolve(process.cwd(), './src/lib'),
        '@routes': resolve(process.cwd(), './src/routes'),
        '@integrations': resolve(process.cwd(), './src/integrations'),
      },
    },
    ssr: {
      noExternal: ["posthog-js", "posthog-js/react"],
    },
    assetsInclude: ['**/*.mp4', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
})

export default config
