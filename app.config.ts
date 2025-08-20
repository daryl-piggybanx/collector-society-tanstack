import { defineConfig } from '@tanstack/react-start/config'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

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
        '@': './src',
        '@assets': './src/assets',
        '@components': './src/components',
        '@lib': './src/lib',
        '@routes': './src/routes',
        '@integrations': './src/integrations',
      },
    },
    ssr: {
      noExternal: ["posthog-js", "posthog-js/react"],
    },
    assetsInclude: ['**/*.mp4', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  },
})

export default config
