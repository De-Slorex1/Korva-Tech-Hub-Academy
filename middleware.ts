import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  let res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value }) => {
            res.cookies.set(name, value)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")
  const isAdmin = req.nextUrl.pathname.startsWith("/admin")
  const isInstructor = req.nextUrl.pathname.startsWith("/instructor")

  if (!user && (isDashboard || isAdmin || isInstructor)) {
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  return res
}