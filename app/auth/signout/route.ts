// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
// import { type NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   const cookieStore = cookies()
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (session) {
//     await supabase.auth.signOut()
//   }

//   return NextResponse.redirect(new URL('/', req.url), {
//     status: 302,
//   })
// }

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}