// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/(.*)',  // All webhook routes
  '/api/test-call',      // Test call endpoint
  '/api/test-env'        // Environment test endpoint
])

// Enable debug in development
const debugOption = process.env.NODE_ENV === 'development'

export default clerkMiddleware(async (auth, request) => {
  // Log incoming requests in development
  if (debugOption) {
    console.log(`Request to: ${request.url}`)
  }
  
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
}, { debug: debugOption })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}