
export type PaymentStatus =
  | "pending"
  | "paid"

export type EnrollmentStatus =
  | "pending"
  | "active"

export type PaymentPlan =
  | "full"
  | "installment"
  | "scholarship"

export interface Enrollment {
  id: string

  firstName: string
  lastName: string
  email: string
  phone: string
  country: string

  programId: string
  programName: string

  paymentPlan: PaymentPlan

  paymentStatus: "pending" | "paid"

  paymentReference: string

  cohort: string

  enrollmentStatus: "pending" | "active"

  createdAt: Date
}