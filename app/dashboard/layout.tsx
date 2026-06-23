import { redirect } from "next/navigation"
import { createSupabaseServer } from "@/lib/supabaseServer"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.id) return redirect("/sign-in")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile || profile.role !== "student") {
    redirect("/sign-in")
  }

  return <>{children}</>
}