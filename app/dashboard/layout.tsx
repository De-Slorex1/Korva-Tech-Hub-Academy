import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import DashboardShell from "./DashboardClientLayout"

export default async function DashboardLayout({
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

  // Use admin client to bypass RLS for profile fetch
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("first_name, last_name, role, student_id, email")
    .eq("user_id", user.id)
    .single()

  console.log("profile result:", profile)

  return (
    <DashboardShell profile={profile}>
      {children}
    </DashboardShell>
  )
}