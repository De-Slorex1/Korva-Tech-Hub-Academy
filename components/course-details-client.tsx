"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CourseSidebar({
  course,
}: {
  course: any
}) {
  const [paymentType, setPaymentType] =
    useState<"fullPayment" | "installment">(
      "fullPayment"
    )

    const router = useRouter()
  return (
    <aside>
    
                    <div className="sticky top-10 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
    
                    <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl">
                        <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                        />
                    </div>
                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-neutral-900 p-2">
                        <button
                            onClick={() => setPaymentType("fullPayment")}
                            className={`rounded-lg py-3 text-sm font-medium transition-all ${
                            paymentType === "fullPayment"
                                ? "bg-violet-300 text-black"
                                : "text-neutral-400"
                            }`}
                        >
                            Full Payment
                        </button>
    
                        <button
                            onClick={() => setPaymentType("installment")}
                            className={`rounded-lg py-3 text-sm font-medium transition-all ${
                            paymentType === "installment"
                                ? "bg-violet-300 text-black"
                                : "text-neutral-400"
                            }`}
                        >
                            Installments
                        </button>
                    </div>
    
                    <div className="mb-4">
    
                        <div className="flex items-center gap-3">
    
                            <span className="text-5xl font-bold text-white">
    
                            {
                                course.price[
                                    paymentType
                                ].discounted
                            }
    
                            </span>
    
                        </div>
    
                        <div className="mt-2">
    
                            <span className="text-lg text-neutral-500 line-through">
    
                            {
                                course.price[
                                paymentType
                                ].original
                            }
    
                            </span>
    
                        </div>
    
                    </div>
                    
                    <div className="mb-6 grid grid-cols-2 gap-3">
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Duration
                        </p>
                        <p className="mt-1 font-semibold">
                        {course.courseDuration}
                        </p>
                    </div>
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Course Outline
                        </p>
                        <p className="mt-1 font-semibold">
                        {course.courseOutline}
                        </p>
                    </div>
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Format
                        </p>
                        <p className="mt-1 font-semibold">
                        Online
                        </p>
                    </div>
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Classes
                        </p>
                        <p className="mt-1 font-semibold">
                        4 Days / Week
                        </p>
                    </div>
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Schedule
                        </p>
                        <p className="mt-1 font-semibold">
                        {course.classFormat}
                        </p>
                    </div>
    
                    <div className="rounded-xl border border-neutral-800 p-3">
                        <p className="text-xs text-neutral-500">
                        Certificate
                        </p>
                        <p className="mt-1 font-semibold">
                        Included
                        </p>
                    </div>
    
                    </div>
    
                    <button
                         onClick={() => router.push("/enrollment")}
                        className="w-full rounded-xl bg-violet-600 py-4 font-semibold"
                    >
                        Enroll Now
                    </button>
    
                    <button
                        className="mt-3 w-full rounded-xl border border-neutral-700 py-4"
                    >
                        Download Syllabus
                    </button>
    
                    <button
                        onClick={() => router.push("https://chat.whatsapp.com/JCKHLqVLkGcGwBUXV9GYOV")}
                        className="mt-3 w-full rounded-xl border border-neutral-700 py-4"
                    >
                        Join Our Community
                    </button>
    
                    <div className="mt-8 border-t border-neutral-800 pt-6">
    
                        <h3 className="mb-5 text-lg font-semibold">
                            What's Included
                        </h3>
    
                        <div className="space-y-3 text-sm text-neutral-300">
    
                            {course.studyMaterials && (
                            <div>✓ Study Materials & Resources</div>
                            )}
    
                            {course.projects && (
                            <div>✓ Practical Projects</div>
                            )}
    
                            {course.internship && (
                            <div>✓ Internship Opportunity</div>
                            )}
    
                            {course.examIncluded && (
                            <div>✓ Examination</div>
                            )}
    
                            {course.certificate && (
                            <div>✓ Professional Certificate</div>
                            )}
    
                            {course.communityAccess && (
                            <div>✓ Community Access</div>
                            )}
    
                            {course.mentorSupport && (
                            <div>✓ Mentor Support</div>
                            )}
    
                            {course.lifetimeAccess && (
                            <div>✓ Lifetime Access</div>
                            )}
    
                        </div>
    
                        </div>
    
                    </div>
    
                </aside>
    
  )
}