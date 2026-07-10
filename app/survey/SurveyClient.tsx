"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Which best describes you right now?",
    type: "single",
    options: [
      "Secondary School Graduate",
      "Undergraduate",
      "Graduate",
      "NYSC Member",
      "Employed",
      "Self-employed / Business Owner",
      "Other",
    ],
  },
  {
    id: 2,
    question: "Why do you want to break into tech?",
    subtitle: "Choose the one that matters most.",
    type: "single",
    options: [
      "Earn a better income",
      "Work remotely",
      "Change careers",
      "Freelance",
      "Build my own startup",
      "I genuinely enjoy technology",
      "Other",
    ],
  },
  {
    id: 3,
    question: "What's your biggest challenge right now?",
    type: "single",
    options: [
      "I don't know where to start.",
      "I'm afraid of choosing the wrong tech path.",
      "AI has made me unsure.",
      "I don't know which tech skill suits me.",
      "I don't have enough time.",
      "I don't know which tech school to trust.",
      "I can't afford to make the wrong decision.",
      "Other",
    ],
  },
  {
    id: 4,
    question: "Have you tried learning tech before?",
    type: "tried",
    options: ["Yes", "No"],
  },
  {
    id: 5,
    question: "Before investing in any tech school...",
    subtitle: "What's the ONE question you need answered before you can confidently say \"yes\"?",
    type: "text",
  },
  {
    id: 6,
    question: "Where should we send your personalized recommendations?",
    type: "contact",
  },
]

type Answers = {
  currentStatus: string
  goal: string
  biggestChallenge: string
  triedBefore: string
  stoppedReason: string
  burningQuestion: string
  fullName: string
  email: string
  whatsapp: string
}

export default function SurveyClient() {
  const [stage, setStage] = useState<"landing" | "survey" | "done">("landing")
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState<Answers>({
    currentStatus: "",
    goal: "",
    biggestChallenge: "",
    triedBefore: "",
    stoppedReason: "",
    burningQuestion: "",
    fullName: "",
    email: "",
    whatsapp: "",
  })

  const current = questions[step]
  const totalSteps = questions.length

  const getAnswerForStep = (stepIndex: number) => {
    switch (stepIndex) {
      case 0: return answers.currentStatus
      case 1: return answers.goal
      case 2: return answers.biggestChallenge
      case 3: return answers.triedBefore
      case 4: return answers.burningQuestion
      default: return ""
    }
  }

  const setAnswerForStep = (stepIndex: number, value: string) => {
    switch (stepIndex) {
      case 0: setAnswers((p) => ({ ...p, currentStatus: value })); break
      case 1: setAnswers((p) => ({ ...p, goal: value })); break
      case 2: setAnswers((p) => ({ ...p, biggestChallenge: value })); break
      case 3: setAnswers((p) => ({ ...p, triedBefore: value })); break
      case 4: setAnswers((p) => ({ ...p, burningQuestion: value })); break
    }
  }

  const canProceed = () => {
    if (step === 0) return !!answers.currentStatus
    if (step === 1) return !!answers.goal
    if (step === 2) return !!answers.biggestChallenge
    if (step === 3) return !!answers.triedBefore
    if (step === 4) return !!answers.burningQuestion
    if (step === 5) return !!answers.fullName && !!answers.email && !!answers.whatsapp
    return false
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      })
      const result = await res.json()
      if (result.success) {
        setStage("done")
      } else {
        alert(result.error ?? "Something went wrong")
      }
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (stage === "done") {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">You're All Set!</h1>
          <p className="text-white/60 text-lg mb-2">
            Hi {answers.fullName.split(" ")[0]}, your personalized recommendations are on their way.
          </p>
          <p className="text-white/40 text-sm">
            Check your inbox at <span className="text-violet-400">{answers.email}</span>
          </p>
          <div className="mt-8 p-4 rounded-2xl border border-violet-500/20 bg-violet-500/5">
            <p className="text-sm text-violet-300">
              While you wait, explore our programs at{" "}
              <a href="/courses" className="underline hover:text-violet-200">
                korvatechhub.com/courses
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (stage === "landing") {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[140px]" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-violet-300 text-sm font-medium">FREE • 3-Minute Assessment</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Stop Guessing Your
            <span className="block bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">
              Way Into Tech.
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-4 max-w-xl mx-auto">
            Most beginners spend months learning the completely wrong skill.
          </p>

          <p className="text-base text-white/50 mb-10 max-w-lg mx-auto">
            Discover the exact bottleneck holding you back using our 180-second structural diagnostic test.
          </p>

          <button
            onClick={() => setStage("survey")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition-opacity shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            Start My Assessment
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-white/30 text-xs">No credit card. No spam. Takes 3 minutes.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-white/40">Question {step + 1} of {totalSteps}</span>
            <span className="text-xs text-violet-400 font-medium">
              {Math.round(((step + 1) / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {current.question}
            </h2>
            {current.subtitle && (
              <p className="text-white/50 text-sm mb-6">{current.subtitle}</p>
            )}
            {!current.subtitle && <div className="mb-6" />}

            {/* Single choice */}
            {current.type === "single" && (
              <div className="space-y-3">
                {current.options?.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAnswerForStep(step, option)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 text-sm ${
                      getAnswerForStep(step) === option
                        ? "border-violet-500 bg-violet-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Tried before */}
            {current.type === "tried" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  {["Yes", "No"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setAnswers((p) => ({ ...p, triedBefore: option }))}
                      className={`flex-1 py-3 rounded-xl border transition-all text-sm font-medium ${
                        answers.triedBefore === option
                          ? "border-violet-500 bg-violet-500/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/30"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {answers.triedBefore === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-sm text-white/50 mb-2 block">
                      What made you stop? (One sentence is enough.)
                    </label>
                    <textarea
                      value={answers.stoppedReason}
                      onChange={(e) => setAnswers((p) => ({ ...p, stoppedReason: e.target.value }))}
                      placeholder="e.g. I got confused and lost motivation..."
                      rows={2}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm resize-none"
                    />
                  </motion.div>
                )}
              </div>
            )}

            {/* Text */}
            {current.type === "text" && (
              <textarea
                value={answers.burningQuestion}
                onChange={(e) => setAnswers((p) => ({ ...p, burningQuestion: e.target.value }))}
                placeholder="Type your question here..."
                rows={4}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm resize-none"
              />
            )}

            {/* Contact */}
            {current.type === "contact" && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={answers.fullName}
                  onChange={(e) => setAnswers((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
                <input
                  type="tel"
                  value={answers.whatsapp}
                  onChange={(e) => setAnswers((p) => ({ ...p, whatsapp: e.target.value }))}
                  placeholder="WhatsApp Number"
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-violet-500 text-sm"
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get My Results
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}