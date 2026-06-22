import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { userId, password } = await req.json()

  // 1. find profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (!profile || error) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  }

  // 2. get email from auth.users via id (BEST WAY)
  const { data: userData, error: userError } =
    await supabase.auth.admin.getUserById(profile.id)

  if (userError || !userData?.user?.email) {
    return NextResponse.json(
      { error: "User auth record not found" },
      { status: 401 }
    )
  }

  // 3. login via Supabase Auth
  const { data, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password,
    })

  if (loginError) {
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    session: data.session,
    role: profile.role,
    user: data.user,
  })
}