export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { receiptTemplate } from "@/lib/receiptTemplate";
import { numberToWords } from "@/lib/numberToWords";

export async function POST(req: Request) {
  let browser = null;

  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Missing reference" },
        { status: 400 }
      );
    }

    console.log("Receipt reference received:", reference);

    // 1. Get enrollment
    const { data: enrollment, error: enrollError } = await supabaseAdmin
      .from("enrollments")
      .select("*")
      .eq("paystack_reference", reference)
      .single();

    if (enrollError || !enrollment) {
      return NextResponse.json(
        { error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // 2. Get profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("first_name, last_name, phone, country, email")
      .eq("user_id", enrollment.user_id)
      .single();

    // 3. Get course
    const { data: course } = await supabaseAdmin
      .from("Course")
      .select("name, price, duration")
      .eq("id", enrollment.course_id)
      .single();

    const fullName =
      `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
      "Unknown User";

    const receiptData = {
      name: fullName,
      email: profile?.email || "N/A",
      phone: profile?.phone || "N/A",
      country: profile?.country || "N/A",

      studentId: enrollment.user_id,
      receiptId: `KTH-${reference.slice(-8)}`,

      date: new Date(enrollment.created_at).toLocaleString(),

      reference,
      status: enrollment.payment_status,

      program: course?.name || "Unknown Course",
      duration: course?.duration || "N/A",

      startDate: enrollment.start_date
        ? new Date(enrollment.start_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "N/A",

      amount: course?.price ?? 0,
      amountWords: `${numberToWords(course?.price || 0)} Naira Only`,
    };

    // 4. HTML
    const html = receiptTemplate(receiptData);

    const page = await browser.newPage();

    // FIX 1: safer request interception
    await page.setRequestInterception(true).catch(() => {});

    page.on("request", (req) => {
      try {
        const blocked = ["image", "font", "media"];

        if (blocked.includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      } catch {
        req.continue();
      }
    });

    // FIX 2: faster + safer load strategy
    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="korva-receipt-${reference}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error("Receipt Error:", error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate receipt" },
      { status: 500 }
    );
  }
}