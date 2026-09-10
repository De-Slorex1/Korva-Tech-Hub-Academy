'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ClipboardList, ChevronDown, ChevronUp,
  CheckCircle2, XCircle, Clock, Plus, X,
  Calendar, Users
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Student = {
  enrollmentId: string
  userId: string
  firstName: string
  lastName: string
  email: string
  studentId: string
}

type Session = {
  id: string
  topic_title: string
  session_date: string
  course_id: string
  notes: string | null
}

type Course = {
  courseId: string
  code: string | null
  title: string
  students: Student[]
  sessions: Session[]
}

type AttendanceRecord = {
  id: string
  session_id: string
  student_id: string
  enrollment_id: string
  status: 'present' | 'absent' | 'late'
  marked_at: string
}

type Props = {
  courses: Course[]
  attendanceRecords: AttendanceRecord[]
  instructorId: string
}

type AttendanceMap = Record<string, 'present' | 'absent' | 'late'>

export default function AttendanceClient({
  courses,
  attendanceRecords,
  instructorId,
}: Props) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(
    courses[0]?.courseId ?? null
  )
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [showMarkModal, setShowMarkModal] = useState(false)
  const [attendanceMap, setAttendanceMap] = useState<AttendanceMap>({})
  const [loading, setLoading] = useState(false)
  const [savedAttendance, setSavedAttendance] = useState<AttendanceRecord[]>(attendanceRecords)
  const [activeTab, setActiveTab] = useState<'mark' | 'history'>('mark')

  const openMarkModal = (session: Session, students: Student[]) => {
    setSelectedSession(session)

    // Pre-fill with existing attendance for this session
    const existing = savedAttendance.filter((a) => a.session_id === session.id)
    const map: AttendanceMap = {}
    students.forEach((s) => {
      const record = existing.find((a) => a.student_id === s.userId)
      map[s.userId] = record?.status ?? 'present'
    })
    setAttendanceMap(map)
    setShowMarkModal(true)
  }

  const getSessionAttendance = (sessionId: string, userId: string) => {
    return savedAttendance.find(
      (a) => a.session_id === sessionId && a.student_id === userId
    )
  }

  const getAttendanceStats = (courseId: string, userId: string) => {
    const course = courses.find((c) => c.courseId === courseId)
    if (!course) return { present: 0, absent: 0, late: 0, total: 0 }

    const sessionIds = course.sessions.map((s) => s.id)
    const records = savedAttendance.filter(
      (a) => sessionIds.includes(a.session_id) && a.student_id === userId
    )

    return {
      present: records.filter((r) => r.status === 'present').length,
      absent: records.filter((r) => r.status === 'absent').length,
      late: records.filter((r) => r.status === 'late').length,
      total: course.sessions.length,
    }
  }

  const handleSaveAttendance = async (students: Student[]) => {
    if (!selectedSession) return
    setLoading(true)

    try {
      const res = await fetch("/api/instructor/mark-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSession.id,
          courseId: selectedSession.course_id,
          attendance: students.map((s) => ({
            studentId: s.userId,
            enrollmentId: s.enrollmentId,
            status: attendanceMap[s.userId] ?? 'present',
          })),
        }),
      })

      const result = await res.json()

      if (result.success) {
        // Update local state
        setSavedAttendance((prev) => {
          const filtered = prev.filter((a) => a.session_id !== selectedSession.id)
          return [...filtered, ...result.records]
        })
        setShowMarkModal(false)
      } else {
        alert(result.error ?? "Failed to save attendance")
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground">
          Mark and track student attendance for each class session.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 border-b border-border">
          {[
            { id: 'mark', label: 'Mark Attendance' },
            { id: 'history', label: 'Attendance History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'mark' | 'history')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mark Attendance Tab */}
      {activeTab === 'mark' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {courses.map((course) => {
            const isExpanded = expandedCourse === course.courseId

            return (
              <Card key={course.courseId} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedCourse(
                      isExpanded ? null : course.courseId
                    )}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {course.students.length} students • {course.sessions.length} sessions
                      </p>
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      : <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    }
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 space-y-3">
                      {course.sessions.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No sessions logged yet. Log a class session first to mark attendance.
                        </p>
                      ) : (
                        course.sessions.map((session) => {
                          const markedCount = savedAttendance.filter(
                            (a) => a.session_id === session.id
                          ).length
                          const isMarked = markedCount > 0

                          return (
                            <div
                              key={session.id}
                              className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30"
                            >
                              <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {session.topic_title}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(session.session_date).toLocaleDateString("en-NG", {
                                      weekday: 'short',
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {isMarked && (
                                  <Badge className="bg-green-500/20 text-green-400 text-xs">
                                    {markedCount}/{course.students.length} marked
                                  </Badge>
                                )}
                                <Button
                                  size="sm"
                                  variant={isMarked ? "outline" : "default"}
                                  onClick={() => openMarkModal(session, course.students)}
                                >
                                  {isMarked ? "Update" : "Mark Attendance"}
                                </Button>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </motion.div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <motion.div variants={itemVariants} className="space-y-6">
          {courses.map((course) => (
            <Card key={course.courseId} className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">{course.title}</h3>

                {course.students.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No students enrolled.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                            Student
                          </th>
                          <th className="text-center py-3 px-2 text-green-400 font-medium">
                            Present
                          </th>
                          <th className="text-center py-3 px-2 text-red-400 font-medium">
                            Absent
                          </th>
                          <th className="text-center py-3 px-2 text-yellow-400 font-medium">
                            Late
                          </th>
                          <th className="text-center py-3 px-2 text-muted-foreground font-medium">
                            Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {course.students.map((student) => {
                          const stats = getAttendanceStats(course.courseId, student.userId)
                          const rate = stats.total > 0
                            ? Math.round(((stats.present + stats.late) / stats.total) * 100)
                            : 0

                          return (
                            <tr key={student.userId} className="border-b border-border/50">
                              <td className="py-3 px-2">
                                <div>
                                  <p className="font-medium text-foreground">
                                    {student.firstName} {student.lastName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {student.studentId || student.email}
                                  </p>
                                </div>
                              </td>
                              <td className="text-center py-3 px-2">
                                <span className="text-green-400 font-semibold">
                                  {stats.present}
                                </span>
                              </td>
                              <td className="text-center py-3 px-2">
                                <span className="text-red-400 font-semibold">
                                  {stats.absent}
                                </span>
                              </td>
                              <td className="text-center py-3 px-2">
                                <span className="text-yellow-400 font-semibold">
                                  {stats.late}
                                </span>
                              </td>
                              <td className="text-center py-3 px-2">
                                <Badge className={`text-xs ${
                                  rate >= 75
                                    ? 'bg-green-500/20 text-green-400'
                                    : rate >= 50
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {rate}%
                                </Badge>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Mark Attendance Modal */}
      {showMarkModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
              <div>
                <h3 className="text-lg font-bold text-foreground">Mark Attendance</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedSession.topic_title} — {new Date(selectedSession.session_date).toLocaleDateString("en-NG", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>
              <button
                onClick={() => setShowMarkModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {/* Quick actions */}
              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-400 border-green-500/30"
                  onClick={() => {
                    const allPresent: AttendanceMap = {}
                    Object.keys(attendanceMap).forEach((id) => {
                      allPresent[id] = 'present'
                    })
                    setAttendanceMap(allPresent)
                  }}
                >
                  Mark All Present
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-400 border-red-500/30"
                  onClick={() => {
                    const allAbsent: AttendanceMap = {}
                    Object.keys(attendanceMap).forEach((id) => {
                      allAbsent[id] = 'absent'
                    })
                    setAttendanceMap(allAbsent)
                  }}
                >
                  Mark All Absent
                </Button>
              </div>

              {/* Get students for selected course */}
              {courses
                .find((c) => c.courseId === selectedSession.course_id)
                ?.students.map((student) => (
                  <div
                    key={student.userId}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/20"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {student.firstName} {student.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {student.studentId || student.email}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { value: 'present', label: 'P', color: 'green' },
                        { value: 'late', label: 'L', color: 'yellow' },
                        { value: 'absent', label: 'A', color: 'red' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setAttendanceMap((prev) => ({
                            ...prev,
                            [student.userId]: option.value as 'present' | 'late' | 'absent',
                          }))}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                            attendanceMap[student.userId] === option.value
                              ? option.color === 'green'
                                ? 'bg-green-500 text-white'
                                : option.color === 'yellow'
                                ? 'bg-yellow-500 text-black'
                                : 'bg-red-500 text-white'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-6 border-t border-border flex gap-3 sticky bottom-0 bg-card">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowMarkModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={loading}
                onClick={() => {
                  const course = courses.find(
                    (c) => c.courseId === selectedSession.course_id
                  )
                  if (course) handleSaveAttendance(course.students)
                }}
              >
                {loading ? "Saving..." : "Save Attendance"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}