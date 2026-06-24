'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Award, CreditCard } from 'lucide-react'
import type courses from "@/data/courses"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}


// KEEP this one
type StaticCourse = typeof courses[number] | null

type Enrollment = {
  id: string
  status: string
  payment_status: string
  payment_plan: string
  start_date: string | null
  course_id: string
  cohort_id: string | null
  cohort: {
    id: string
    name: string
    start_date: string
    end_date: string
    is_active: boolean
  } | null
  staticCourse: StaticCourse
}

type Props = {
  profile: { first_name: string; last_name: string; student_id: string | null } | null
  enrollments: Enrollment[]
  totalPaid: number
}

export default function DashboardClient({ profile, enrollments, totalPaid }: Props) {
  const router = useRouter()
  const firstName = profile?.first_name ?? "Student"
  const activeCohort = enrollments.find(e => e.cohort?.is_active)?.cohort

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Good Morning, {firstName}! 👋
        </h1>
        <p className="text-muted-foreground">
          Keep pushing forward. Your future self is proud of you.
        </p>
        {profile?.student_id && (
          <p className="text-xs text-muted-foreground">
            Student ID: <span className="font-mono text-primary">{profile.student_id}</span>
          </p>
        )}
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                <p className="text-2xl font-bold text-foreground">{enrollments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Active Cohort</p>
                <p className="text-sm font-bold text-foreground">
                  {activeCohort ? activeCohort.name : "Not assigned"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-sm font-bold text-muted-foreground">Coming Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-foreground">
                  ₦{totalPaid.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* My Courses */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">My Courses</h2>
        {enrollments.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
              <Button className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => router.push('/courses')}>
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.map((enrollment) => {
              const course = enrollment.staticCourse

              return (
                <Card key={enrollment.id} className="bg-card border-border">
                  <CardContent className="p-0">
                    {course?.image && (
                      <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-foreground">
                          {course?.title ?? "Unknown Course"}
                        </h3>
                        <Badge className={
                          enrollment.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }>
                          {enrollment.status}
                        </Badge>
                      </div>

                      {course?.stack && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {course.stack.slice(0, 4).map((s) => (
                            <span key={s} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {enrollment.cohort && (
                        <p className="text-xs text-muted-foreground mb-3">
                          Cohort: <span className="text-primary">{enrollment.cohort.name}</span>
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <Badge variant="outline" className="text-xs capitalize">
                          {enrollment.payment_status}
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => router.push(`/courses/${course?.code}`)}
                        >
                          View Course
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Cohort Info */}
      {activeCohort && (
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-bold text-foreground mb-4">My Cohort</h2>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cohort Name</p>
                  <p className="font-semibold text-foreground">{activeCohort.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(activeCohort.start_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">End Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(activeCohort.end_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Assignments & Certificates */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Assignments</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground text-sm">Assignment tracking coming soon.</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Certificates</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground text-sm">Certificates will appear here once earned.</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}