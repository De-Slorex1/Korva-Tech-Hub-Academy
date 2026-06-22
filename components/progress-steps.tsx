import { Check } from "lucide-react"

const steps = [
  { number: 1, label: "Profile" },
  { number: 2, label: "Program" },
  { number: 3, label: "Payment Plan" },
  { number: 4, label: "Review" },
]

export function ProgressSteps({
  activeStep = 1,
}: {
  activeStep?: number
}) {
  return (
    <div className="flex w-full items-center justify-center overflow-x-auto py-2">
      <div className="flex min-w-max items-center px-2 sm:px-0">
        {steps.map((step, index) => {
          const isActive = step.number === activeStep
          const isCompleted = step.number < activeStep

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all sm:h-9 sm:w-9 ${
                    isActive
                      ? "bg-[#8B5CF6] text-white"
                      : isCompleted
                      ? "bg-[#8B5CF6]/25 text-white"
                      : "bg-white/[0.08] text-white/65"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.number
                  )}
                </span>

                <span
                  className={`max-w-[70px] text-center text-[11px] leading-tight sm:max-w-none sm:text-left sm:text-sm ${
                    isActive || isCompleted
                      ? "font-medium text-white"
                      : "text-white/65"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <span
                  className={`mx-2 h-px w-6 sm:mx-4 sm:w-12 ${
                    step.number < activeStep
                      ? "bg-[#8B5CF6]/40"
                      : "bg-white/[0.12]"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}