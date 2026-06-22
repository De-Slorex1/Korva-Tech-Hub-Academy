import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, reference, enrollmentId } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Missing email" },
        { status: 400 }
      );
    }

    // TEMP: replace with real email provider later (Resend, Nodemailer, etc)
    console.log("📧 Sending email to:", email);
    console.log("Ref:", reference);
    console.log("Enrollment:", enrollmentId);

    return NextResponse.json({
      success: true,
      message: "Email triggered (mock)",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}