import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already subscribed" });
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) throw error;

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Subscription failed" },
      { status: 500 }
    );
  }
}