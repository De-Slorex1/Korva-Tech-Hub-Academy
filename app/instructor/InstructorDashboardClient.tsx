'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, FileText, BookOpen, ClipboardList, ArrowRight, Calendar } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type Course = {
  courseId: string
  code: string | null
  title: string
  image: string | null
  studentCount: number
}

type Session = {
  id: string
  topic_title: string
  session_date: string
  course_id: string
}

type Props = {
  courses: Course[]
  totalStudents: number
  pendingSubmissions: number
  recentSessions: Session[]
  instructorId: string
}

export default function InstructorDashboardClient({
  courses,
  totalStudents,
  pendingSubmissions,
  recentSessions,
  instructorId,
}: Props) {
  const router = useRouter()

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Instructor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your courses, students, and assignments.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: "My Courses", value: courses.length.toString(), icon: BookOpen, color: "text-primary" },
          { label: "Total Students", value: totalStudents.toString(), icon: Users, color: "text-accent" },
          { label: "Pending Reviews", value: pendingSubmissions.toString(), icon: FileText, color: "text-yellow-500" },
          { label: "Sessions Held", value: recentSessions.length.toString(), icon: ClipboardList, color: "text-green-500" },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="pt-6">
                <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* My Courses */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">My Courses</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/instructor/courses")}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <Card key={course.courseId} className="bg-card border-border">
              <CardContent className="p-0">
                {course.image && (
                  <div className="h-28 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.studentCount} active students
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/instructor/courses/${course.code}`)}
                    >
                      Manage
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => router.push(`/instructor/attendance?course=${course.courseId}`)}
                    >
                      Attendance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Grade Submissions",
              description: `${pendingSubmissions} submissions waiting for review`,
              href: "/instructor/assignments",
              color: "border-yellow-500/30 bg-yellow-500/5",
              badge: pendingSubmissions > 0 ? `${pendingSubmissions} pending` : null,
            },
            {
              title: "Mark Attendance",
              description: "Record attendance for today's class",
              href: "/instructor/attendance",
              color: "border-green-500/30 bg-green-500/5",
              badge: null,
            },
            {
              title: "Post Announcement",
              description: "Send an update to your students",
              href: "/instructor/announcements",
              color: "border-primary/30 bg-primary/5",
              badge: null,
            },
          ].map((action, idx) => (
            <Card
              key={idx}
              className={`border cursor-pointer hover:scale-[1.02] transition-transform ${action.color}`}
              onClick={() => router.push(action.href)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{action.title}</h3>
                  {action.badge && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                      {action.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Go <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Sessions */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Class Sessions</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/instructor/courses")}
          >
            Log Session
          </Button>
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            {recentSessions.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">
                No sessions logged yet. Start by logging your first class session.
              </p>
            ) : (
              <div className="space-y-3">
                {recentSessions.map((session) => (
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
                    <Badge className="bg-green-500/20 text-green-400">Logged</Badge>
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