PiggyVerse

# Getting Started

Note: pnpm is required!

To run this application:

```bash
pnpm install
pnpm dev 
```

# Development Process

pushing to staging automatically deploys to [piggyverse-dev](https://piggyverse-dev.netlify.app/)

```bash
git pull origin main
git checkout staging

git add .
git commit -m "Add new feature"
git push origin staging
```

# Production Deployment

pushing to main automatically deploys to [PiggyVerse](https://piggyverse.netlify.app/) and [CollectorsOnly](https://www.collectorsonly.com/)

```bash
git checkout main
git merge staging
git push origin main
```
# Web App Details

## Dependencies

### Core Framework & Runtime
- **React 19** - current version as of 12/06/25
- **Vinxi** - full-stack React framework with SSR support
- **Vite** - fast build tool and development server

### Routing & Navigation
- **@tanstack/react-router** - type-safe client-side routing
- **@tanstack/react-start** - full-stack React framework integration
- **@tanstack/router-plugin** - router build-time optimizations

### State Management & Data Fetching
- **@tanstack/react-query** - server state management and caching
- **@tanstack/react-form** - performant form state management
- **@trpc/client & @trpc/server** - end-to-end type-safe APIs
- **@trpc/tanstack-react-query** - tRPC + React Query integration

### UI Components & Styling
- **@radix-ui/** - headless, accessible UI primitives:
  - Alert Dialog, Checkbox, Label, Progress, Radio Group, Select, Slider, Slot, Switch
- **Tailwind CSS 4** - utility-first CSS framework
- **tailwindcss-animate** - aimation utilities for Tailwind
- **Framer Motion** - motion library
- **Lucide React** - consistent icon library
- **React Icons** - more in-depth icon library collection

### Backend Integrations
- **@supabase/supabase-js** - Supabase client for database & auth
- **webflow-api** - Webflow CMS integration
- **posthog-js** - product analytics and feature flags

### Form Validation & Utilities
- **Zod** - TypeScript-first schema validation
- **libphonenumber-js** - phone number parsing and validation
- **class-variance-authority (CVA)** - variant-based component styling
- **clsx & tailwind-merge** - conditional CSS class utilities

### Development & Testing
- **TypeScript** - static type checking
- **Vitest** - unit testing framework
- **@testing-library/react** - React component testing utilities
- **@tanstack/react-query-devtools** - React Query development tools

## File Structure (12/06/25)

```
@/src/
├── /components                          # React components directory
│    ├── /form                          # Form-related components
│    │    ├── new.tsx                   # New collector form component
│    │    ├── reservation.tsx           # Reservation form component
│    │    ├── verification.tsx          # Form verification component
│    │    ├── og.tsx                    # Original form component
│    │    ├── update.tsx                # Update form component
│    │    └── types.ts                  # Form-related TypeScript types
│    ├── /phases                        # Multi-step form phase components
│    │    ├── marketing-consent.tsx     # Marketing consent phase
│    │    ├── piece-selection.tsx       # Piece selection phase
│    │    ├── confirmation-page.tsx     # Confirmation page phase
│    │    ├── success-page.tsx          # Success page component
│    │    ├── shipping-address.tsx      # Shipping address input phase
│    │    ├── community-rules.tsx       # Community rules acceptance phase
│    │    ├── community-experience.tsx  # Community experience input phase
│    │    ├── user-identity.tsx         # User identity verification phase
│    │    ├── collector-pieces.tsx      # Collector pieces selection phase
│    │    ├── top-categories.tsx        # Top categories selection phase
│    │    ├── collector-reasons.tsx     # Collector reasons input phase
│    │    ├── new-categories.tsx        # New categories input phase
│    │    └── collector-type.tsx        # Collector type selection phase
│    ├── /games                         # Game-related components
│    │    ├── game-over-screen.tsx      # Game over screen component
│    │    ├── flappy-pig.tsx            # Main Flappy Pig game component
│    │    ├── futuristic-building.tsx   # Game background building component
│    │    ├── leaderboard.tsx           # Game leaderboard display
│    │    ├── pipe.tsx                  # Game pipe obstacle component
│    │    ├── score-display.tsx         # Score display component
│    │    ├── score-entry.tsx           # Score entry form component
│    │    └── start-screen.tsx          # Game start screen
│    ├── /sprites                       # Game sprite components
│    │    ├── bird.tsx                  # Bird sprite component
│    │    └── space-pig.tsx             # Space pig sprite component
│    ├── /ui                            # Reusable UI components (shadcn/ui)
│    │    ├── card.tsx                  # Card component
│    │    ├── domain-button.tsx         # Domain-specific button component
│    │    ├── file-upload.tsx           # File upload component
│    │    ├── futuristic-button.tsx     # Futuristic styled button
│    │    ├── button.tsx                # Base button component
│    │    ├── alert-dialog.tsx          # Alert dialog component
│    │    ├── progress.tsx              # Progress bar component
│    │    ├── textarea.tsx              # Textarea input component
│    │    ├── radio-group.tsx           # Radio group component
│    │    ├── label.tsx                 # Label component
│    │    ├── input.tsx                 # Input field component
│    │    ├── checkbox.tsx              # Checkbox component
│    │    ├── switch.tsx                # Switch/toggle component
│    │    ├── slider.tsx                # Slider component
│    │    └── select.tsx                # Select dropdown component
│    ├── /icons                         # Icon components (empty)
│    ├── Header.tsx                     # Main header component
│    ├── action-buttons.tsx             # Action buttons component
│    ├── redirect-buttons.tsx           # Redirect buttons component
│    ├── collector-form.tsx             # Main collector form component
│    ├── holographic-card.tsx           # Holographic card display component
│    ├── particle-background-twinkle.tsx # Twinkling particle background
│    ├── particle-background.tsx        # Main particle background component
│    ├── video-background.tsx           # Video background component
│    └── demo.FormComponents.tsx        # Demo form components
├── /utils                              # Utility functions
│    ├── validation.ts                  # Form validation utilities
│    └── localStorage.ts                # Local storage helper functions
├── /lib                                # Library configurations and utilities
│    ├── data.ts                        # Data management utilities
│    └── utils.ts                       # General utility functions
├── /integrations                       # Third-party service integrations
│    ├── /klaviyo                       # Klaviyo email marketing integration
│    │    └── /profiles
│    │         ├── services.ts          # Klaviyo profile services
│    │         └── types.ts             # Klaviyo profile types
│    ├── /supabase                      # Supabase backend integration
│    │    ├── client.ts                 # Supabase client configuration
│    │    ├── services.ts               # Supabase data services
│    │    └── types.ts                  # Supabase-related types
│    ├── /webflow                       # Webflow CMS integration
│    │    └── /assets
│    │         ├── services.ts          # Webflow asset services
│    │         └── types.ts             # Webflow asset types
│    ├── /tanstack-query                # TanStack Query configuration
│    │    ├── root-provider.tsx         # Query client root provider
│    │    └── layout.tsx                # Query layout wrapper
│    ├── /posthog                       # PostHog analytics integration
│    │    └── provider.tsx              # PostHog provider component
│    └── /trpc                          # tRPC API client setup
│         ├── init.ts                   # tRPC client initialization
│         ├── react.ts                  # React tRPC hooks
│         └── router.ts                 # tRPC router configuration
├── /routes                             # TanStack Router route definitions
│    ├── /api                           # API routes
│    │    └── /klaviyo
│    │         └── profiles.ts          # Klaviyo profiles API endpoint
│    ├── __root.tsx                     # Root route layout
│    ├── index.tsx                      # Home page route
│    ├── collector.reservation.tsx      # Collector reservation route
│    ├── collector.new.tsx              # New collector signup route
│    ├── collector.og.tsx               # Original collector route
│    ├── collector.update.tsx           # Update collector info route
│    ├── collector.discord.tsx          # Discord collector integration route
│    ├── play.flappy-pig.tsx            # Flappy Pig game route
│    ├── play.leaderboard.tsx           # Game leaderboard route
│    ├── demo.holo-cards.tsx            # Holographic cards demo route
│    ├── demo.form.address.tsx          # Address form demo route
│    ├── demo.form.simple.tsx           # Simple form demo route
│    ├── demo.tanstack-query.tsx        # TanStack Query demo route
│    ├── demo.start.api-request.tsx     # API request demo route
│    ├── demo.start.server-funcs.tsx    # Server functions demo route
│    ├── api.demo-names.ts              # Demo names API route
│    └── api.trpc.$.tsx                 # tRPC API catch-all route
├── /hooks                              # Custom React hooks
│    ├── use-game-input.ts              # Game input handling hook
│    ├── use-game-physics.ts            # Game physics calculations hook
│    ├── shared-data.ts                 # Shared data management hook
│    ├── use-mobile.tsx                 # Mobile detection hook
│    ├── collector.form.tsx             # Collector form state hook
│    ├── demo.form-context.ts           # Demo form context hook
│    └── demo.form.ts                   # Demo form hook
├── /assets                             # Static assets
│    ├── logo-red.png                   # Red version of logo
│    └── logo-white.png                 # White version of logo
├── routeTree.gen.ts                    # Generated route tree (TanStack Router)
├── styles.css                          # Global CSS styles
├── ssr.tsx                             # Server-side rendering setup
├── router.tsx                          # Router configuration
├── client.tsx                          # Client-side entry point
├── api.ts                              # API utilities
└── logo.svg                            # SVG logo file
```

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

