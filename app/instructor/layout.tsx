import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import InstructorShell from "./InstructorShell"

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/sign-in")

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("first_name, last_name, role, email")
    .eq("user_id", user.id)
    .single()

  if (!profile || profile.role !== "instructor") redirect("/sign-in")

  return (
    <InstructorShell profile={profile}>
      {children}
    </InstructorShell>
  )
}