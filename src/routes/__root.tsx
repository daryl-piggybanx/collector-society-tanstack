import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import LogoHeader from '../components/logo-header'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'
import { cn } from '@/lib/utils'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'

import type { TRPCRouter } from '@/integrations/trpc/router'
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query'

import { PostHogClientProvider } from '@/integrations/posthog/provider'


interface MyRouterContext {
  queryClient: QueryClient

  trpc: TRPCOptionsProxy<TRPCRouter>
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'PiggyVerse',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo-white.png',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/logo-white-circle.ico',
      },
    ],
  }),

  component: () => {
    const router = useRouter()
    const currentPath = router.state.location.pathname
    
    // Exclude routes that start with '/play' from showing the header
    const shouldShowHeader = currentPath.startsWith('/collector')

    return (
      <RootDocument>
        <PostHogClientProvider>
          {shouldShowHeader && <LogoHeader />}

          <Outlet />
          <TanStackRouterDevtools />

          <TanstackQueryLayout />
        </PostHogClientProvider>
      </RootDocument>
    )
  },
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <footer className="absolute bottom-0 left-0 p-8 text-sm text-white/50">
          <p>PIGGYBANK ©2025</p>
        </footer>
        <Scripts />
      </body>
    </html>
  )
}
