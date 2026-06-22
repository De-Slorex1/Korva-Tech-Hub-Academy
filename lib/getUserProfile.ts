import { createClient } from "@/lib/supabaseClient"

export async function getUserProfile(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  return { data, error }
}