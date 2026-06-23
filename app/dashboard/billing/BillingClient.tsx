'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Enrollment = {
  id: string
  course_id: string
  payment_plan: string
  status: string
  payment_status: string
  created_at: string
  courseName: string
}

type Payment = {
  id: string
  amount: number
  status: string
  paid_at: string
  reference: string
  enrollment_id: string
}

type Installment = {
  id: string
  enrollment_id: string
  installment_number: number
  amount: number
  due_date: string
  status: string
  paid_at: string | null
}

type Props = {
  enrollments: Enrollment[]
  payments: Payment[]
  installments: Installment[]
  userId: string
}

function getDaysUntil(dateStr: string) {
  const due = new Date(dateStr)
  const now = new Date()
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export default function BillingClient({ enrollments, payments, installments, userId }: Props) {
  const [payingId, setPayingId] = useState<string | null>(null)

  const handlePayInstallment = async (installmentId: string, enrollmentId: string) => {
    setPayingId(installmentId)

    try {
      const enrollment = enrollments.find((e) => e.id === enrollmentId)
      if (!enrollment) return

      const res = await fetch("/api/billing/pay-installment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ installmentId, enrollmentId }),
      })

      const result = await res.json()

      if (result.authorization_url) {
        window.location.href = result.authorization_url
      } else {
        alert(result.error ?? "Payment failed")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setPayingId(null)
    }
  }

  const pendingInstallments = installments.filter((i) => i.status === "pending")
  const paidInstallments = installments.filter((i) => i.status === "paid")
  const nextInstallment = pendingInstallments[0] ?? null
  const daysUntilNext = nextInstallment ? getDaysUntil(nextInstallment.due_date) : null

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">Manage your payments and installments.</p>
      </motion.div>

      {/* Next Installment Countdown */}
      {nextInstallment && (
        <motion.div variants={itemVariants}>
          <Card className={`border-2 ${
            daysUntilNext !== null && daysUntilNext <= 7
              ? "border-yellow-500/50 bg-yellow-500/5"
              : "border-primary/30 bg-primary/5"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {daysUntilNext !== null && daysUntilNext <= 0 ? (
                    <AlertCircle className="w-8 h-8 text-destructive shrink-0" />
                  ) : (
                    <Clock className="w-8 h-8 text-primary shrink-0" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Installment {nextInstallment.installment_number} of 3
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      ₦{nextInstallment.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Due: {new Date(nextInstallment.due_date).toLocaleDateString("en-NG", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {daysUntilNext !== null && daysUntilNext > 0 ? (
                    <div className={`text-4xl font-bold mb-1 ${
                      daysUntilNext <= 7 ? "text-yellow-400" : "text-primary"
                    }`}>
                      {daysUntilNext}
                      <span className="text-sm font-normal text-muted-foreground ml-1">days left</span>
                    </div>
                  ) : (
                    <p className="text-destructive font-bold text-lg mb-1">Overdue</p>
                  )}

                  <Button
                    onClick={() => handlePayInstallment(nextInstallment.id, nextInstallment.enrollment_id)}
                    disabled={payingId === nextInstallment.id}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {payingId === nextInstallment.id ? "Redirecting..." : "Pay Now"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Enrollments */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">My Enrollments</h2>
        <div className="space-y-3">
          {enrollments.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No enrollments found.</p>
              </CardContent>
            </Card>
          ) : (
            enrollments.map((enrollment) => (
              <Card key={enrollment.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{enrollment.courseName}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">
                        {enrollment.payment_plan} payment
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        enrollment.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : enrollment.status === "suspended"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-yellow-500/20 text-yellow-400"
                      }>
                        {enrollment.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {enrollment.payment_status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </motion.div>

      {/* Installment Schedule */}
      {installments.length > 0 && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-foreground mb-4">Installment Schedule</h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-3">
              {installments.map((installment) => (
                <div key={installment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    {installment.status === "paid" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        Installment {installment.installment_number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(installment.due_date).toLocaleDateString("en-NG", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">
                      ₦{installment.amount.toLocaleString()}
                    </span>
                    <Badge className={
                      installment.status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : installment.status === "overdue"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-yellow-500/20 text-yellow-400"
                    }>
                      {installment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Payment History */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Payment History</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {payments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No payments yet.</p>
            ) : (
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        ₦{payment.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {payment.paid_at
                          ? new Date(payment.paid_at).toLocaleDateString("en-NG", {
                              day: "numeric", month: "long", year: "numeric"
                            })
                          : "Date unavailable"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        Ref: {payment.reference}
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}