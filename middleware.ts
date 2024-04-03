// import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
// import { NextResponse } from 'next/server'

// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()
//   const supabase = createMiddlewareClient({ req, res })

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // if user is signed in and the current path is / redirect the user to /account
//   if (user && req.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/account', req.url))
//   }

//   // if user is not signed in and the current path is not / redirect the user to /
//   if (!user && req.nextUrl.pathname !== '/') {
//     return NextResponse.redirect(new URL('/', req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ['/', '/account'],
// }

import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}