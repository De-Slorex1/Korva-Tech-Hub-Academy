'use client'

import { motion } from 'framer-motion'
import { Zap, TrendingUp, Target, Book } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockUser, mockUserStats, mockCourses, mockWeeklyProgress, mockAssignments, mockLiveClasses, mockCohort } from '@/lib/mock-data'
import LearningStreakCard from '@/components/dashboard/learning-streak-card'
import CareerReadinessCard from '@/components/dashboard/career-readiness-card'
import ProgressChart from '@/components/dashboard/progress-chart'
import CourseCard from '@/components/dashboard/course-card'
import LiveClassCard from '@/components/dashboard/live-class-card'
import CohortCard from '@/components/dashboard/cohort-card'
import CommunityCard from '@/components/dashboard/community-card'
import CertificatesCard from '@/components/dashboard/certificates-card'
import MentorCard from '@/components/dashboard/mentor-card'
import RecentAssignmentsTable from '@/components/dashboard/recent-assignments-table'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function DashboardPage() {
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
          Good Morning, {mockUser.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Keep pushing forward. Your future self is proud of you.
        </p>
      </motion.div>

      {/* Top Stats Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <LearningStreakCard streak={mockUserStats.learningStreak} />
        <CareerReadinessCard progress={mockUserStats.careerReadiness} />
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next Live Class</p>
                <p className="text-lg font-semibold text-foreground">
                  {mockLiveClasses[0].date}, {mockLiveClasses[0].time}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {mockLiveClasses[0].title}
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                Join Class
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Progress</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-accent">
                  {mockUserStats.totalProgress}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Course Completion
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Course & Progress */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border overflow-hidden">
            <CardContent className="p-6">
              <Badge className="bg-accent/20 text-accent border border-accent/30 mb-3">
                In Progress
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {mockCourses[0].title}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {mockCourses[0].description}
              </p>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {mockCourses[0].completedLessons} / {mockCourses[0].lessons} lessons
                  </span>
                  <span className="text-sm font-semibold text-accent">
                    {mockCourses[0].progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full transition-all"
                    style={{ width: `${mockCourses[0].progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Module</p>
                  <p className="text-sm font-semibold text-foreground">
                    {mockCourses[0].module}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
                  <p className="text-sm font-semibold text-foreground">
                    {mockCourses[0].nextLesson}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  Continue Learning
                </Button>
                <Button variant="outline">View Curriculum</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <ProgressChart />
          <MentorCard />
        </div>
      </motion.div>

      {/* Live Classes & Community */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LiveClassCard liveClass={mockLiveClasses[0]} />
        <CohortCard cohort={mockCohort} />
        <CommunityCard />
      </motion.div>

      {/* Certificates & Mentor Support */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CertificatesCard />
        <Card className="bg-card border-border md:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Career Readiness Tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { label: 'Portfolio', value: '80%', status: 'on-track' },
                { label: 'GitHub Projects', value: '6/8', status: 'on-track' },
                { label: 'LinkedIn Profile', value: 'Complete', status: 'complete' },
                { label: 'CV Uploaded', value: 'Yes', status: 'complete' },
                { label: 'Interview Prep', value: 'Pending', status: 'pending' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <Badge
                    className={`${
                      item.status === 'complete'
                        ? 'bg-accent text-accent-foreground'
                        : item.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              Go to Career Hub
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Assignments */}
      <motion.div variants={itemVariants}>
        <RecentAssignmentsTable assignments={mockAssignments} />
      </motion.div>
    </motion.div>
  )
}
