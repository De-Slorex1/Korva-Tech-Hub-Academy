'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileText, Plus, X, ChevronDown, ChevronUp,
  ExternalLink, CheckCircle2, Clock, Star
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Course = { courseId: string; title: string }

type Assignment = {
  id: string
  course_id: string
  title: string
  description: string
  due_date: string | null
  type: string
  created_at: string
  file_url: string | null 
}


type Submission = {
  id: string
  assignment_id: string
  user_id: string
  submission_link: string | null  // ← add this
  github_url: string | null
  live_url: string | null
  note: string | null
  notes: string | null
  status: string
  grade: number | null
  feedback: string | null
  submitted_at: string
  profile: {
    first_name: string
    last_name: string
    email: string
    student_id: string
  } | null
}

type Enrollment = {
  id: string
  course_id: string
  user_id: string
  profile: {
    first_name: string
    last_name: string
    email: string
    student_id: string
  } | null
}

type Props = {
  courses: Course[]
  assignments: Assignment[]
  submissions: Submission[]
  enrollments: Enrollment[]
  instructorId: string
  isProjects?: boolean  // ← add this
}

export default function InstructorAssignmentsClient({
  courses,
  assignments,
  submissions,
  enrollments,
  instructorId,
  isProjects = false,
}: Props) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'grade'>('assignments')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [expandedAssignment, setExpandedAssignment] = useState<string | null>(null)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const [localAssignments, setLocalAssignments] = useState<Assignment[]>(assignments)
  const [localSubmissions, setLocalSubmissions] = useState<Submission[]>(submissions)

  const [form, setForm] = useState({
    courseId: courses[0]?.courseId ?? "",
    title: "",
    description: "",
    dueDate: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.courseId) return
    setLoading(true)

    try {
        let fileUrl: string | null = null

        // Upload file to Supabase storage if selected
        if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const fileName = `${Date.now()}-${form.title.replace(/\s+/g, '-')}.${fileExt}`

        const uploadRes = await fetch("/api/instructor/upload-file", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            fileName,
            fileType: selectedFile.type,
            }),
        })

        const { signedUrl, publicUrl } = await uploadRes.json()

        if (signedUrl) {
            await fetch(signedUrl, {
            method: "PUT",
            body: selectedFile,
            headers: { "Content-Type": selectedFile.type },
            })
            fileUrl = publicUrl
        }
        }

        const res = await fetch("/api/instructor/create-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            courseId: form.courseId,
            title: form.title,
            description: form.description,
            dueDate: form.dueDate || null,
            type: isProjects ? "project" : "assignment",
            fileUrl,
        }),
        })

        const result = await res.json()
        if (result.success) {
        setLocalAssignments((prev) => [result.assignment, ...prev])
        setShowCreateModal(false)
        setSelectedFile(null)
        setForm({ courseId: courses[0]?.courseId ?? "", title: "", description: "", dueDate: "" })
        } else {
        alert(result.error ?? "Failed to create")
        }
    } catch {
        alert("Something went wrong")
    } finally {
        setLoading(false)
    }
    }

  const handleGrade = async () => {
    if (!selectedSubmission || !grade) return
    setLoading(true)

    try {
      const res = await fetch("/api/instructor/grade-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          grade: Number(grade),
          feedback,
        }),
      })

      const result = await res.json()
      if (result.success) {
        setLocalSubmissions((prev) =>
          prev.map((s) =>
            s.id === selectedSubmission.id
              ? { ...s, grade: Number(grade), feedback, status: "graded" }
              : s
          )
        )
        setShowGradeModal(false)
        setGrade("")
        setFeedback("")
      } else {
        alert(result.error ?? "Failed to grade submission")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const getSubmissionsForAssignment = (assignmentId: string) =>
    localSubmissions.filter((s) => s.assignment_id === assignmentId)

  const pendingCount = localSubmissions.filter((s) => s.status === "submitted").length

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {isProjects ? "Projects" : "Assignments"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Create assignments and grade student submissions.
          </p>
        </div>
       <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {isProjects ? "New Project" : "New Assignment"}
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <div className="flex gap-2 border-b border-border">
          {[
            { id: 'assignments', label: isProjects ? 'All Projects' : 'All Assignments' },
            { id: 'grade', label: `Pending Review ${pendingCount > 0 ? `(${pendingCount})` : ''}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* All Assignments Tab */}
      {activeTab === 'assignments' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {localAssignments.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No assignments yet. Create your first one.</p>
              </CardContent>
            </Card>
          ) : (
            localAssignments.map((assignment) => {
              const subs = getSubmissionsForAssignment(assignment.id)
              const course = courses.find((c) => c.courseId === assignment.course_id)
              const isExpanded = expandedAssignment === assignment.id
              const gradedCount = subs.filter((s) => s.status === "graded").length
              const submittedCount = subs.length

              return (
                <Card key={assignment.id} className="bg-card border-border">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedAssignment(
                        isExpanded ? null : assignment.id
                      )}
                      className="w-full flex items-start justify-between p-6 text-left hover:bg-muted/50 transition-colors rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                          <Badge className="bg-primary/20 text-primary text-xs">
                            {isProjects ? "Project" : "Assignment"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {course?.title ?? "Unknown Course"}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{submittedCount} submissions</span>
                          <span>{gradedCount} graded</span>
                          {assignment.due_date && (
                            <span>Due: {new Date(assignment.due_date).toLocaleDateString("en-NG", {
                              day: "numeric", month: "short", year: "numeric"
                            })}</span>
                          )}
                        </div>
                      </div>
                      {isExpanded
                        ? <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                        : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      }
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4">
                        <div className="rounded-xl border border-border bg-muted/20 p-4">
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {assignment.description}
                          </p>
                        </div>

                        {/* Add after the description box in the expanded section */}
                            {assignment.file_url && (
                            <a
                                href={assignment.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <FileText className="w-4 h-4" />
                                Download Attachment
                            </a>
                            )
                        }

                        <h4 className="text-sm font-semibold text-foreground">
                          Student Submissions ({subs.length})
                        </h4>

                        {subs.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No submissions yet.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {subs.map((sub) => (
                              <div
                                key={sub.id}
                                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
                              >
                                <div>
                                  <p className="text-sm font-medium text-foreground">
                                    {sub.profile?.first_name} {sub.profile?.last_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {sub.profile?.student_id} • Submitted {new Date(sub.submitted_at).toLocaleDateString()}
                                  </p>
                                  {sub.grade !== null && (
                                    <p className="text-xs text-green-400 mt-1">
                                      Grade: {sub.grade}/100
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {sub.submission_link && (
                                      <a
                                      href={sub.submission_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-primary flex items-center gap-1"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      View
                                    </a>
                                  )}
                                  <Badge className={`text-xs ${
                                    sub.status === 'graded'
                                      ? 'bg-green-500/20 text-green-400'
                                      : 'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {sub.status}
                                  </Badge>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedSubmission(sub)
                                      setGrade(sub.grade?.toString() ?? "")
                                      setFeedback(sub.feedback ?? "")
                                      setShowGradeModal(true)
                                    }}
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    {sub.status === 'graded' ? 'Update Grade' : 'Grade'}
                                  </Button>
                                </div>
                              </div>
                            ))}
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
      )}

      {/* Pending Review Tab */}
      {activeTab === 'grade' && (
        <motion.div variants={itemVariants} className="space-y-4">
          {localSubmissions.filter((s) => s.status === "submitted").length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-muted-foreground">All submissions have been graded!</p>
              </CardContent>
            </Card>
          ) : (
            localSubmissions
              .filter((s) => s.status === "submitted")
              .map((sub) => {
                const assignment = localAssignments.find((a) => a.id === sub.assignment_id)
                return (
                  <Card key={sub.id} className="bg-card border-border">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">
                            {sub.profile?.first_name} {sub.profile?.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {assignment?.title ?? "Unknown Assignment"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted {new Date(sub.submitted_at).toLocaleDateString("en-NG", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </p>
                          {sub.notes && (
                            <p className="text-xs text-muted-foreground mt-1 italic">
                              "{sub.notes}"
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {sub.github_url && (
                            <a
                              href={sub.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" variant="outline">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View Work
                              </Button>
                            </a>
                          )}
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(sub)
                              setGrade("")
                              setFeedback("")
                              setShowGradeModal(true)
                            }}
                          >
                            <Star className="w-3 h-3 mr-1" />
                            Grade Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
          )}
        </motion.div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">
                {isProjects ? "New Project" : "New Assignment"}
              </h3>
              <button onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Course</label>
                <select
                  value={form.courseId}
                  onChange={(e) => set("courseId", e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                >
                  {courses.map((c) => (
                    <option key={c.courseId} value={c.courseId}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Build a Portfolio Website"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Describe the assignment requirements..."
                  rows={4}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Attachment (optional)
                </label>
                <div className="relative">
                    <input
                    type="file"
                    id="assignment-file"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                    />
                    <label
                    htmlFor="assignment-file"
                    className="flex items-center gap-3 w-full px-4 py-3 bg-muted border border-border border-dashed rounded-lg text-muted-foreground cursor-pointer hover:border-primary hover:text-primary transition-colors text-sm"
                    >
                    <FileText className="w-4 h-4 shrink-0" />
                    {selectedFile
                        ? selectedFile.name
                        : "Click to upload a file (PDF, DOC, image, ZIP)"
                    }
                    </label>
                    {selectedFile && (
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Max file size: 10MB
                </p>
                </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Due Date (optional)</label>
                <input
                  type="datetime-local"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleCreate}
                  disabled={loading || !form.title || !form.description}
                >
                  {loading ? "Creating..." : "Create Assignment"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {showGradeModal && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Grade Submission</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedSubmission.profile?.first_name} {selectedSubmission.profile?.last_name}
                </p>
              </div>
              <button onClick={() => setShowGradeModal(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedSubmission.submission_link && (
                <a
                  href={selectedSubmission.submission_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Submitted Work
                </a>
              )}

              {(selectedSubmission.note || selectedSubmission.notes) && (
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-xs text-muted-foreground mb-1">Student notes:</p>
                  <p className="text-sm text-foreground">
                    {selectedSubmission.note || selectedSubmission.notes}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Grade (out of 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g. 85"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Feedback for student
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write detailed feedback to help the student improve..."
                  rows={4}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowGradeModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleGrade}
                  disabled={loading || !grade}
                >
                  {loading ? "Saving..." : "Save Grade"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}