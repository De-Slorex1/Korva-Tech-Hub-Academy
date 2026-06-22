"use client"

import courses from "@/data/courses"
import { Enrollment } from "@/types/enrollements"
import { COURSE_IDS } from "@/lib/course-ids"
import {
  User,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import { useState } from "react";

interface ReviewStepProps {
  data: Partial<Enrollment>
  back: () => void
}

export function ReviewStep({
  data,
  back,
}: ReviewStepProps) {
  const selectedCourse = courses.find(
    (course) => course.code === data.programId
  )
  const [loading, setLoading] = useState(false);
  const paymentLabel =
    data.paymentPlan === "full"
      ? "Full Payment"
      : data.paymentPlan === "installment"
      ? "Installment Plan"
      : "Scholarship Application"

  const amount =
    data.paymentPlan === "installment"
      ? selectedCourse?.price.installment.discounted
      : selectedCourse?.price.fullPayment.discounted

  const handleProceed = async () => {
  try {
    setLoading(true);

    const courseId = data.programId
      ? COURSE_IDS[data.programId as keyof typeof COURSE_IDS]
      : null;

    if (!courseId) {
      alert("Invalid course selected");
      return;
    }
    
    const res = await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        country: data.country,
        courseId,
        cohortId: data.cohortId,
        paymentPlan: data.paymentPlan,
      }),
    });

    const result = await res.json();

    if (!result.authorization_url) {
      throw new Error(result.error || "Payment failed");
    }

    window.location.href = result.authorization_url;
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
      {/* Header */}

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Almost Done
        </div>

        <h2 className="mt-4 text-3xl font-bold">
          Review Your Enrollment
        </h2>

        <p className="mt-2 text-white/60">
          Confirm your details before proceeding
          to secure your admission.
        </p>
      </div>

      {/* Sections */}

      <div className="space-y-6">
        {/* Personal Info */}

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-violet-400" />
            <h3 className="font-semibold">
              Personal Information
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              icon={User}
              label="Full Name"
              value={`${data.firstName || ""} ${
                data.lastName || ""
              }`}
            />

            <InfoItem
              icon={Mail}
              label="Email"
              value={data.email}
            />

            <InfoItem
              icon={Phone}
              label="Phone"
              value={data.phone}
            />

            <InfoItem
              icon={Globe}
              label="Country"
              value={data.country}
            />
          </div>
        </div>

        {/* Program */}

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-violet-400" />
            <h3 className="font-semibold">
              Program Selection
            </h3>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-white">
              {data.programName}
            </p>

            <p className="text-sm text-white/60">
              {selectedCourse?.courseDuration}
            </p>

            <p className="text-sm text-white/60">
              {selectedCourse?.classSchedule}
            </p>
          </div>
        </div>

        {/* Payment */}

        <div className="rounded-2xl border border-white/10 p-5">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-violet-400" />
            <h3 className="font-semibold">
              Payment Plan
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {paymentLabel}
              </p>

              <p className="text-sm text-white/60">
                {data.paymentPlan === "scholarship"
                  ? "Application review required"
                  : "Secure your seat immediately"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-white/50">
                Amount
              </p>

              <p className="text-xl font-bold text-violet-300">
                {data.paymentPlan === "scholarship"
                  ? "Pending Review"
                  : amount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}

      <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
        <p className="text-sm text-violet-200">
          By continuing, you confirm that all
          information provided is accurate and
          understand that enrollment is subject to
          admission review and payment verification.
        </p>
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={back}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

         <button
          onClick={handleProceed}
          disabled={loading}
          className="
            inline-flex w-full sm:w-auto items-center justify-center gap-2
            rounded-xl bg-violet-600 px-6 py-3 text-sm font-medium text-white
            transition hover:bg-violet-500
            disabled:opacity-60 disabled:cursor-not-allowed
            active:scale-[0.99]
            shadow-[0_0_25px_rgba(139,92,246,0.25)]
          "
        >
          {loading ? (
            "Redirecting..."
          ) : (
            <>
              {data.paymentPlan === "scholarship"
                ? "Submit Application"
                : "Proceed to Payment"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

interface InfoItemProps {
  icon: any
  label: string
  value?: string
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-white/40">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>

      <p className="text-white/90">
        {value || "-"}
      </p>
    </div>
  )
}