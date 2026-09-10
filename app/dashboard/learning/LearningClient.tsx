'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Users, Award, ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react'


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
  status: string
  cohort: { id: string; name: string } | null
  staticCourse: any
  completedLessons: number
  totalLessons: number
  progressPercent: number
}

type ClassSession = {
  course_id: string
  module_index: number
  lesson_index: number
  session_date: string
  topic_title: string
}

type AttendanceRecord = {
  id: string
  status: 'present' | 'absent' | 'late'
  marked_at: string
  session: {
    id: string
    topic_title: string
    session_date: string
    course_id: string
  } | null
}

type Props = {
  enrollments: Enrollment[]
  totalStudyHours: number
  cohortMemberCount: number
  userId: string
  classSessions: ClassSession[]
  attendanceRecords: AttendanceRecord[]  // ← add this
}



export default function LearningClient({
  enrollments,
  totalStudyHours,
  cohortMemberCount,
  userId,
  classSessions,
  attendanceRecords,
}: Props) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(
    enrollments[0]?.id ?? null
  )
  const [completingLesson, setCompletingLesson] = useState<string | null>(null)
  const [localProgress, setLocalProgress] = useState<Record<string, boolean>>({})

  const toggleCourse = (id: string) => {
    setExpandedCourse(expandedCourse === id ? null : id)
  }

  const markLessonComplete = async (
    enrollmentId: string,
    courseCode: string,
    moduleIndex: number,
    lessonIndex: number,
    lessonTitle: string
  ) => {
    const key = `${courseCode}-${moduleIndex}-${lessonIndex}`
    setCompletingLesson(key)

    try {
      await fetch("/api/lesson-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId,
          courseCode,
          moduleIndex,
          lessonIndex,
          lessonTitle,
        }),
      })

      setLocalProgress((prev) => ({ ...prev, [key]: true }))
    } catch (err) {
      console.error("Failed to mark lesson complete", err)
    } finally {
      setCompletingLesson(null)
    }
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Learning</h1>
        <p className="text-muted-foreground">
          Track your progress across all courses and modules.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Courses', value: enrollments.length.toString(), icon: BookOpen },
          { label: 'Study Time', value: `${totalStudyHours} hrs`, icon: Clock },
          { label: 'Study Group', value: `${cohortMemberCount} members`, icon: Users },
          {
            label: 'Classes Attended',
            value: `${attendanceRecords.filter((a) => a.status === 'present' || a.status === 'late').length}/${classSessions.length}`,
            icon: Award
          },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="pt-6">
                <Icon className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Courses */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">My Courses</h2>

        {enrollments.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active courses found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => {
              const course = enrollment.staticCourse
              const isExpanded = expandedCourse === enrollment.id

              return (
                <Card key={enrollment.id} className="bg-card border-border">
                  {/* Course Header */}
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleCourse(enrollment.id)}
                      className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/50 transition-colors rounded-lg"
                    >
                      {course?.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {course?.title ?? "Unknown Course"}
                          </h3>
                          <Badge className="bg-green-500/20 text-green-400 shrink-0">
                            Active
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-muted-foreground">
                            {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                          </span>
                          <span className="text-xs font-semibold text-accent">
                            {enrollment.progressPercent}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500"
                            style={{ width: `${enrollment.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {isExpanded
                        ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                        : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      }
                    </button>

                    {/* Curriculum Modules */}
                    {isExpanded && course?.curriculum && (
                      <div className="px-6 pb-6 space-y-4">
                        {course.curriculum.map((module: any, moduleIdx: number) => (
                          <div key={moduleIdx} className="rounded-lg border border-border overflow-hidden">
                            <div className="bg-muted/50 px-4 py-3">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-foreground">
                                  {module.title}
                                </h4>
                                <span className="text-xs text-muted-foreground">
                                  {module.duration}
                                </span>
                              </div>
                            </div>

                            <div className="divide-y divide-border">
                              {module.lessons.map((lesson: string, lessonIdx: number) => {
                                const key = `${course.code}-${moduleIdx}-${lessonIdx}`
                                const isCompleted = localProgress[key] ?? false
                                const isLoading = completingLesson === key

                                return (
                                  <div
                                    key={lessonIdx}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                                      )}
                                      <span className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                        {lesson}
                                      </span>
                                    </div>

                                    {!isCompleted && (
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        disabled={isLoading}
                                        onClick={() => markLessonComplete(
                                          enrollment.id,
                                          course.code,
                                          moduleIdx,
                                          lessonIdx,
                                          lesson
                                        )}
                                        className="text-xs text-accent hover:text-accent shrink-0"
                                      >
                                        {isLoading ? "Saving..." : "Mark Complete"}
                                      </Button>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Attendance Summary */}
                    {(() => {
                      const courseAttendance = attendanceRecords.filter(
                        (a) => a.session?.course_id === enrollment.course_id
                      )
                      const courseSessionsTotal = classSessions.filter(
                        (s) => s.course_id === enrollment.course_id
                      ).length

                      if (courseAttendance.length === 0) return null

                      const present = courseAttendance.filter((a) => a.status === 'present').length
                      const late = courseAttendance.filter((a) => a.status === 'late').length
                      const absent = courseAttendance.filter((a) => a.status === 'absent').length
                      const attended = present + late
                      const total = courseAttendance.length
                      const rate = Math.round((attended / total) * 100)

                      return (
                        <div className="mx-6 mb-6 rounded-lg border border-border overflow-hidden">
                          <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-foreground">My Attendance</h4>
                            <span className="text-xs font-bold text-accent">
                              {attended}/{courseSessionsTotal} classes
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="px-4 pt-3">
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  rate >= 75 ? 'bg-green-400' : rate >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${rate}%` }}
                              />
                            </div>
                            <div className="flex justify-between mt-1 mb-3">
                              <span className="text-xs text-muted-foreground">{rate}% attendance rate</span>
                              {rate < 75 && (
                                <span className="text-xs text-red-400">Below 75% minimum</span>
                              )}
                            </div>
                          </div>

                          <div className="px-4 pb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex gap-4">
                                <div className="text-center">
                                  <p className="text-lg font-bold text-green-400">{present}</p>
                                  <p className="text-xs text-muted-foreground">Present</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-bold text-yellow-400">{late}</p>
                                  <p className="text-xs text-muted-foreground">Late</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-bold text-red-400">{absent}</p>
                                  <p className="text-xs text-muted-foreground">Absent</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-lg font-bold text-muted-foreground">
                                    {courseSessionsTotal - total}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Upcoming</p>
                                </div>
                              </div>
                              <Badge className={`${
                                rate >= 75
                                  ? 'bg-green-500/20 text-green-400'
                                  : rate >= 50
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {attended}/{courseSessionsTotal}
                              </Badge>
                            </div>

                            {/* Session list */}
                            <div className="space-y-2 mt-2">
                              {courseAttendance.slice(0, 5).map((record, idx) => (
                                <div
                                  key={record.id}
                                  className="flex items-center justify-between text-xs py-1"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground w-4">{idx + 1}.</span>
                                    <span className="text-muted-foreground">
                                      {record.session?.topic_title ?? "Class session"}
                                    </span>
                                  </div>
                                  <Badge className={`text-xs ${
                                    record.status === 'present'
                                      ? 'bg-green-500/20 text-green-400'
                                      : record.status === 'late'
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-red-500/20 text-red-400'
                                  }`}>
                                    {record.status}
                                  </Badge>
                                </div>
                              ))}
                              {courseAttendance.length > 5 && (
                                <p className="text-xs text-muted-foreground text-center pt-1">
                                  +{courseAttendance.length - 5} more sessions
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}