'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Search, ChevronDown, ChevronUp, Mail, Phone, Globe } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Course = { courseId: string; title: string }

type Student = {
  enrollmentId: string
  userId: string
  courseId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  studentId: string
  startDate: string
  paymentStatus: string
  attendanceRate: number
  attendedSessions: number
  totalSessions: number
  submissionsCount: number
  avgGrade: number | null
}

type Props = {
  courses: Course[]
  students: Student[]
}

export default function InstructorStudentsClient({ courses, students }: Props) {
  const [search, setSearch] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const filtered = students.filter((s) => {
    const matchesCourse = selectedCourse === "all" || s.courseId === selectedCourse
    const matchesSearch =
      `${s.firstName} ${s.lastName} ${s.email} ${s.studentId}`
        .toLowerCase()
        .includes(search.toLowerCase())
    return matchesCourse && matchesSearch
  })

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Students</h1>
        <p className="text-muted-foreground">
          View and monitor all enrolled students across your courses.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: students.length },
          { label: "Avg Attendance", value: `${students.length > 0 ? Math.round(students.reduce((s, st) => s + st.attendanceRate, 0) / students.length) : 0}%` },
          { label: "Total Submissions", value: students.reduce((s, st) => s + st.submissionsCount, 0) },
          { label: "Courses", value: courses.length },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-card border-border">
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or student ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.courseId} value={c.courseId}>{c.title}</option>
          ))}
        </select>
      </motion.div>

      {/* Students List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filtered.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No students found.</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((student) => {
            const isExpanded = expandedStudent === student.enrollmentId
            const course = courses.find((c) => c.courseId === student.courseId)

            return (
              <Card key={student.enrollmentId} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedStudent(
                      isExpanded ? null : student.enrollmentId
                    )}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/50 transition-colors rounded-lg"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-sm">
                        {student.firstName[0]}{student.lastName[0]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">
                          {student.firstName} {student.lastName}
                        </p>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {student.studentId} • {course?.title}
                      </p>
                    </div>

                    {/* Quick stats */}
                    <div className="hidden md:flex items-center gap-6 text-center">
                      <div>
                        <p className={`text-sm font-bold ${
                          student.attendanceRate >= 75 ? 'text-green-400'
                          : student.attendanceRate >= 50 ? 'text-yellow-400'
                          : 'text-red-400'
                        }`}>
                          {student.attendanceRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">
                          {student.submissionsCount}
                        </p>
                        <p className="text-xs text-muted-foreground">Submissions</p>
                      </div>
                      {student.avgGrade !== null && (
                        <div>
                          <p className={`text-sm font-bold ${
                            student.avgGrade >= 75 ? 'text-green-400'
                            : student.avgGrade >= 50 ? 'text-yellow-400'
                            : 'text-red-400'
                          }`}>
                            {student.avgGrade}/100
                          </p>
                          <p className="text-xs text-muted-foreground">Avg Grade</p>
                        </div>
                      )}
                    </div>

                    {isExpanded
                      ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    }
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-4">
                      {/* Contact info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 shrink-0" />
                          <span className="truncate">{student.email}</span>
                        </div>
                        {student.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span>{student.phone}</span>
                          </div>
                        )}
                        {student.country && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="w-4 h-4 shrink-0" />
                            <span>{student.country}</span>
                          </div>
                        )}
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className={`text-xl font-bold ${
                            student.attendanceRate >= 75 ? 'text-green-400'
                            : student.attendanceRate >= 50 ? 'text-yellow-400'
                            : 'text-red-400'
                          }`}>
                            {student.attendanceRate}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Attendance Rate</p>
                          <p className="text-xs text-muted-foreground">
                            {student.attendedSessions}/{student.totalSessions} classes
                          </p>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className="text-xl font-bold text-foreground">
                            {student.submissionsCount}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Submissions</p>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className={`text-xl font-bold ${
                            student.avgGrade !== null
                              ? student.avgGrade >= 75 ? 'text-green-400'
                              : student.avgGrade >= 50 ? 'text-yellow-400'
                              : 'text-red-400'
                              : 'text-muted-foreground'
                          }`}>
                            {student.avgGrade !== null ? `${student.avgGrade}/100` : 'N/A'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Avg Grade</p>
                        </div>
                        <div className="rounded-xl bg-muted/50 p-3 text-center">
                          <p className="text-xl font-bold text-foreground">
                            {student.startDate
                              ? new Date(student.startDate).toLocaleDateString("en-NG", {
                                  day: "numeric", month: "short"
                                })
                              : "N/A"
                            }
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Enrolled</p>
                        </div>
                      </div>

                      {/* Attendance warning */}
                      {student.attendanceRate < 75 && student.totalSessions > 0 && (
                        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-3">
                          <p className="text-sm text-red-400">
                            ⚠️ Below minimum attendance requirement (75%). Currently at {student.attendanceRate}%.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </motion.div>
    </motion.div>
  )
}