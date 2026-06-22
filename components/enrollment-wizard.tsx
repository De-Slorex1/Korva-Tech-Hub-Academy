"use client"

import { useState } from "react"
import { Enrollment } from "@/types/enrollements"
import { ProgressSteps } from "./progress-steps"
import { ProfileStep } from "./enrollment-form"
import { TrackStep } from "./track-step"
import { PaymentStep } from "./payment-step"
import { ReviewStep } from "./review-step"
// import { TrustIndicators } from "./trust-indicators"

export function EnrollmentWizard() {
  const [step, setStep] = useState(1)
  const [enrollmentData, setEnrollmentData] = useState<Partial<Enrollment>>({
    paymentStatus: "pending",
    enrollmentStatus: "pending",
  })

  return (
    <>
      <ProgressSteps activeStep={step} />

      <div className="mt-10">
            {step === 1 && (
                <ProfileStep
                    data={enrollmentData}
                    setData={setEnrollmentData}
                    next={() => setStep(2)}
                />
            )}

            {step === 2 && (
                <TrackStep
                    data={enrollmentData}
                    setData={setEnrollmentData}
                    back={() => setStep(1)}
                    next={() => setStep(3)}
                />
            )}

           {step === 3 && (
                <PaymentStep
                    data={enrollmentData}
                    setData={setEnrollmentData}
                    back={() => setStep(2)}
                    next={() => setStep(4)}
                />
            )}

            {step === 4 && (
                <ReviewStep 
                    data={enrollmentData}
                    back={() => setStep(3)}
                />
             )}
        </div>
    </>
  )
}