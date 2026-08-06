'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen, ChevronDown, ChevronUp,
  CheckCircle2, Circle, Plus, X, Calendar
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Cohort = {
  id: string
  name: string
  start_date: string
  end_date: string
  is_active: boolean
}

type Session = {
  id: string
  topic_title: string
  session_date: string
  module_index: number
  lesson_index: number
  notes: string | null
}

type Course = {
  courseId: string
  code: string | null
  title: string
  image: string | null
  curriculum: { title: string; duration: string; lessons: string[] }[]
  cohorts: Cohort[]
  sessions: Session[]
}

type Props = {
  courses: Course[]
  instructorId: string
}

export default function InstructorCoursesClient({ courses, instructorId }: Props) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(
    courses[0]?.courseId ?? null
  )
  const [showLogModal, setShowLogModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [selectedCohortId, setSelectedCohortId] = useState("")
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0)
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0)
  const [sessionDate, setSessionDate] = useState(
    new Date().toISOString().slice(0, 16)
  )
  const [sessionNotes, setSessionNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [localSessions, setLocalSessions] = useState<Record<string, Session[]>>({})

  const getSessionsForCourse = (courseId: string, existingSessions: Session[]) =>
    [...(localSessions[courseId] ?? []), ...existingSessions]

  const isLessonCovered = (
    courseId: string,
    existingSessions: Session[],
    moduleIdx: number,
    lessonIdx: number
  ) => {
    const all = getSessionsForCourse(courseId, existingSessions)
    return all.some(
      (s) => s.module_index === moduleIdx && s.lesson_index === lessonIdx
    )
  }

  const handleLogSession = async () => {
    if (!selectedCourse) return
    setLoading(true)

    const module = selectedCourse.curriculum[selectedModuleIdx]
    const lessonTitle = module?.lessons[selectedLessonIdx] ?? ""

    try {
      const res = await fetch("/api/instructor/log-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: selectedCourse.courseId,
          cohortId: selectedCohortId || null,
          topicTitle: lessonTitle,
          moduleIndex: selectedModuleIdx,
          lessonIndex: selectedLessonIdx,
          sessionDate,
          notes: sessionNotes,
        }),
      })

      const result = await res.json()

      if (result.success) {
        const newSession: Session = {
          id: result.session.id,
          topic_title: lessonTitle,
          session_date: sessionDate,
          module_index: selectedModuleIdx,
          lesson_index: selectedLessonIdx,
          notes: sessionNotes,
        }

        setLocalSessions((prev) => ({
          ...prev,
          [selectedCourse.courseId]: [
            newSession,
            ...(prev[selectedCourse.courseId] ?? []),
          ],
        }))

        setShowLogModal(false)
        setSessionNotes("")
      } else {
        alert(result.error ?? "Failed to log session")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Courses</h1>
        <p className="text-muted-foreground">
          View your assigned courses and log class sessions.
        </p>
      </motion.div>

      {courses.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No courses assigned yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => {
            const isExpanded = expandedCourse === course.courseId
            const allSessions = getSessionsForCourse(course.courseId, course.sessions)

            return (
              <motion.div key={course.courseId} variants={itemVariants}>
                <Card className="bg-card border-border">
                  <CardContent className="p-0">
                    {/* Course Header */}
                    <button
                      onClick={() => setExpandedCourse(
                        isExpanded ? null : course.courseId
                      )}
                      className="w-full flex items-center gap-4 p-6 text-left hover:bg-muted/50 transition-colors rounded-lg"
                    >
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">
                            {allSessions.length} sessions logged
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {course.cohorts.length} cohorts
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCourse(course)
                            setSelectedCohortId(course.cohorts[0]?.id ?? "")
                            setSelectedModuleIdx(0)
                            setSelectedLessonIdx(0)
                            setShowLogModal(true)
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Log Session
                        </Button>
                        {isExpanded
                          ? <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          : <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        }
                      </div>
                    </button>

                    {/* Curriculum with session indicators */}
                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4">
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Curriculum Progress
                        </h4>
                        {course.curriculum.map((module, moduleIdx) => (
                          <div
                            key={moduleIdx}
                            className="rounded-lg border border-border overflow-hidden"
                          >
                            <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
                              <h5 className="text-sm font-semibold text-foreground">
                                {module.title}
                              </h5>
                              <span className="text-xs text-muted-foreground">
                                {module.duration}
                              </span>
                            </div>
                            <div className="divide-y divide-border">
                              {module.lessons.map((lesson, lessonIdx) => {
                                const covered = isLessonCovered(
                                  course.courseId,
                                  course.sessions,
                                  moduleIdx,
                                  lessonIdx
                                )
                                return (
                                  <div
                                    key={lessonIdx}
                                    className="flex items-center justify-between px-4 py-3"
                                  >
                                    <div className="flex items-center gap-3">
                                      {covered ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                                      )}
                                      <span className={`text-sm ${covered ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                        {lesson}
                                      </span>
                                    </div>
                                    {covered && (
                                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                                        Covered
                                      </Badge>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}

                        {/* Recent Sessions */}
                        {allSessions.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-foreground mb-3">
                              Recent Sessions
                            </h4>
                            <div className="space-y-2">
                              {allSessions.slice(0, 5).map((session) => (
                                <div
                                  key={session.id}
                                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm font-medium text-foreground">
                                        {session.topic_title}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {new Date(session.session_date).toLocaleDateString("en-NG", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge className="bg-green-500/20 text-green-400">
                                    Logged
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Log Session Modal */}
      {showLogModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Log Class Session</h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Cohort */}
              {selectedCourse.cohorts.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Cohort
                  </label>
                  <select
                    value={selectedCohortId}
                    onChange={(e) => setSelectedCohortId(e.target.value)}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                  >
                    {selectedCourse.cohorts.map((cohort) => (
                      <option key={cohort.id} value={cohort.id}>
                        {cohort.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Module */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Module
                </label>
                <select
                  value={selectedModuleIdx}
                  onChange={(e) => {
                    setSelectedModuleIdx(Number(e.target.value))
                    setSelectedLessonIdx(0)
                  }}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                >
                  {selectedCourse.curriculum.map((module, idx) => (
                    <option key={idx} value={idx}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Topic Covered
                </label>
                <select
                  value={selectedLessonIdx}
                  onChange={(e) => setSelectedLessonIdx(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                >
                  {selectedCourse.curriculum[selectedModuleIdx]?.lessons.map(
                    (lesson, idx) => (
                      <option key={idx} value={idx}>
                        {lesson}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Session Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Notes (optional)
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Any notes about this session..."
                  rows={3}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleLogSession}
                  disabled={loading}
                >
                  {loading ? "Logging..." : "Log Session"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}