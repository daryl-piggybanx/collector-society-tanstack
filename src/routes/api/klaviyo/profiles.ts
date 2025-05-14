// only if need public endpoint

import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/klaviyo/profiles')({
  // Only needed for public HTTP endpoints
  POST: async ({ request }) => {
    // Handle webhook or third-party integration
  },
})