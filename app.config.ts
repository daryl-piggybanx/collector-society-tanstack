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
    ssr: {
      noExternal: ["posthog-js", "posthog-js/react"],
    },
    assetsInclude: ['**/*.mp4', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
    build: {
      rollupOptions: {
        external: (id) => {
          // Externalize all assets from /assets/ directory
          return id.startsWith('/assets/')
        }
      }
    }
  },
})

export default config
