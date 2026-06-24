'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, AlertCircle, CheckCircle, X, ExternalLink } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import courses from '@/data/courses'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Submission = {
  id: string
  assignment_id: string
  submission_link: string | null
  note: string | null
  status: string
  grade: number | null
  feedback: string | null
  submitted_at: string
  graded_at: string | null
}

type Assignment = {
  id: string
  course_id: string
  courseCode: string | null
  title: string
  description: string
  due_date: string
  max_grade: number
  submission: Submission | null
}

type Props = {
  assignments: Assignment[]
  userId: string
  enrollments: { id: string; course_id: string }[]
}

function getDaysUntil(dateStr: string) {
  const due = new Date(dateStr)
  const now = new Date()
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export default function AssignmentsClient({ assignments, userId, enrollments }: Props) {
  const [activeModal, setActiveModal] = useState<Assignment | null>(null)
  const [link, setLink] = useState("")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [localSubmissions, setLocalSubmissions] = useState<Record<string, Submission>>({})

  const getSubmission = (assignment: Assignment) =>
    localSubmissions[assignment.id] ?? assignment.submission

  const getCourseName = (assignment: Assignment) => {
    const staticCourse = courses.find((c) => c.code === assignment.courseCode)
    return staticCourse?.title ?? "Unknown Course"
  }

  const handleSubmit = async (assignment: Assignment) => {
    if (!link.trim()) {
      alert("Please enter a submission link.")
      return
    }

    const enrollment = enrollments.find((e) => e.course_id === assignment.course_id)
    if (!enrollment) return

    setLoading(true)

    try {
      const res = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId: assignment.id,
          enrollmentId: enrollment.id,
          submissionLink: link,
          note,
        }),
      })

      const result = await res.json()

      if (result.success) {
        setLocalSubmissions((prev) => ({
          ...prev,
          [assignment.id]: {
            id: result.submission.id,
            assignment_id: assignment.id,
            submission_link: link,
            note,
            status: "submitted",
            grade: null,
            feedback: null,
            submitted_at: new Date().toISOString(),
            graded_at: null,
          },
        }))
        setActiveModal(null)
        setLink("")
        setNote("")
      } else {
        alert(result.error ?? "Submission failed")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const pending = assignments.filter((a) => !getSubmission(a))
  const submitted = assignments.filter((a) => {
    const sub = getSubmission(a)
    return sub && sub.status === "submitted"
  })
  const graded = assignments.filter((a) => {
    const sub = getSubmission(a)
    return sub && sub.status === "graded"
  })

  const totalAssignments = assignments.length
  const completedCount = submitted.length + graded.length
  const avgGrade =
    graded.length > 0
      ? Math.round(
          graded.reduce((sum, a) => {
            const sub = getSubmission(a)
            return sum + ((sub?.grade ?? 0) / a.max_grade) * 100
          }, 0) / graded.length
        )
      : null

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
    const submission = getSubmission(assignment)
    const daysLeft = getDaysUntil(assignment.due_date)
    const isOverdue = daysLeft < 0

    return (
      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground mb-1 truncate">
                {assignment.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getCourseName(assignment)}
              </p>
            </div>
            <Badge
              className={
                submission?.status === "graded"
                  ? "bg-accent/20 text-accent shrink-0"
                  : submission?.status === "submitted"
                  ? "bg-blue-500/20 text-blue-400 shrink-0"
                  : isOverdue
                  ? "bg-destructive/20 text-destructive shrink-0"
                  : "bg-yellow-500/20 text-yellow-400 shrink-0"
              }
            >
              {submission?.status === "graded"
                ? "Graded"
                : submission?.status === "submitted"
                ? "Submitted"
                : isOverdue
                ? "Overdue"
                : "Pending"}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {assignment.description}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Grade</p>
              <p className="text-lg font-semibold text-accent">
                {submission?.grade != null
                  ? `${submission.grade}/${assignment.max_grade}`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Percentage</p>
              <p className="text-lg font-semibold text-foreground">
                {submission?.grade != null
                  ? `${Math.round((submission.grade / assignment.max_grade) * 100)}%`
                  : "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Due Date</p>
              <p
                className={`text-sm font-medium ${
                  isOverdue && !submission ? "text-destructive" : "text-foreground"
                }`}
              >
                {new Date(assignment.due_date).toLocaleDateString("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {submission?.feedback && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Instructor Feedback</p>
              <p className="text-sm text-foreground">{submission.feedback}</p>
            </div>
          )}

          {submission?.submission_link && (
            <a
              href={submission.submission_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
            >
              <ExternalLink className="w-4 h-4" />
              View Submission
            </a>
          )}

          {!submission ? (
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                setActiveModal(assignment)
                setLink("")
                setNote("")
              }}
            >
              Submit Assignment
            </Button>
          ) : submission.status === "resubmit" ? (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                setActiveModal(assignment)
                setLink(submission.submission_link ?? "")
                setNote(submission.note ?? "")
              }}
            >
              Resubmit
            </Button>
          ) : (
            <Button className="w-full" variant="outline" disabled>
              {submission.status === "graded" ? "Graded" : "Submitted"}
            </Button>
          )}
        </CardContent>
      </Card>
    )
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground">Submit and track your assignment progress.</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Assignments", value: totalAssignments.toString(), icon: FileText },
          { label: "Completed", value: completedCount.toString(), icon: CheckCircle },
          { label: "Pending", value: pending.length.toString(), icon: AlertCircle },
          {
            label: "Average Grade",
            value: avgGrade != null ? `${avgGrade}%` : "N/A",
            icon: CheckCircle,
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

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="all">All ({totalAssignments})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
            <TabsTrigger value="submitted">Submitted ({submitted.length})</TabsTrigger>
            <TabsTrigger value="graded">Graded ({graded.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {assignments.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No assignments yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {assignments.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            {pending.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending assignments.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pending.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="mt-6">
            {submitted.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No submitted assignments yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {submitted.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="graded" className="mt-6">
            {graded.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">No graded assignments yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {graded.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Submit Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Submit Assignment</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{activeModal.title}</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Submission Link (GitHub / Google Drive) *
                </label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://github.com/your-repo"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any notes for your instructor..."
                  rows={3}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => handleSubmit(activeModal)}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}