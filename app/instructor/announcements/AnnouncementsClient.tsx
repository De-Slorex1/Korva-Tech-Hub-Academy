'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, Plus, X, Trash2 } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Course = { courseId: string; title: string }

type Announcement = {
  id: string
  course_id: string
  title: string
  body: string
  created_at: string
}

type Props = {
  courses: Course[]
  announcements: Announcement[]
  instructorId: string
}

export default function AnnouncementsClient({
  courses,
  announcements,
  instructorId,
}: Props) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [localAnnouncements, setLocalAnnouncements] = useState(announcements)
  const [form, setForm] = useState({
    courseId: courses[0]?.courseId ?? "",
    title: "",
    body: "",
  })

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handlePost = async () => {
    if (!form.title || !form.body || !form.courseId) return
    setLoading(true)

    try {
      const res = await fetch("/api/instructor/post-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const result = await res.json()
      if (result.success) {
        setLocalAnnouncements((prev) => [result.announcement, ...prev])
        setShowModal(false)
        setForm({ courseId: courses[0]?.courseId ?? "", title: "", body: "" })
      } else {
        alert(result.error ?? "Failed to post announcement")
      }
    } catch {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return

    await fetch("/api/instructor/delete-announcement", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    setLocalAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Post updates and important information to your students.
          </p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {localAnnouncements.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No announcements yet.</p>
            </CardContent>
          </Card>
        ) : (
          localAnnouncements.map((a) => {
            const course = courses.find((c) => c.courseId === a.course_id)
            return (
              <Card key={a.id} className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{a.title}</h3>
                        <Badge className="bg-primary/20 text-primary text-xs">
                          {course?.title ?? "Unknown Course"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-2">
                        {a.body}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(a.created_at).toLocaleDateString("en-NG", {
                          day: "numeric", month: "short", year: "numeric",
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </motion.div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">New Announcement</h3>
              <button onClick={() => setShowModal(false)}>
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
                  placeholder="e.g. Class rescheduled to Friday"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Message</label>
                <textarea
                  value={form.body}
                  onChange={(e) => set("body", e.target.value)}
                  placeholder="Write your announcement here..."
                  rows={5}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handlePost}
                  disabled={loading || !form.title || !form.body}
                >
                  {loading ? "Posting..." : "Post Announcement"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}