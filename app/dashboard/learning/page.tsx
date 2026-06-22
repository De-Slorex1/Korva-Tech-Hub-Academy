'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockCourses } from '@/lib/mock-data'
import { BookOpen, Clock, Users, Award } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function LearningPage() {
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
          { label: 'Active Courses', value: '3', icon: BookOpen },
          { label: 'Study Time', value: '27 hrs', icon: Clock },
          { label: 'Study Group', value: '24 members', icon: Users },
          { label: 'Certificates', value: '2 in progress', icon: Award },
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

      {/* Courses Grid */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => (
            <Card key={course.id} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <Badge className="bg-accent/20 text-accent mb-3">
                  {course.status}
                </Badge>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {course.completedLessons}/{course.lessons} lessons
                    </span>
                    <span className="text-xs font-semibold text-accent">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent/70"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  Continue Lesson
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Course Modules */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Featured Course Modules</h2>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              {mockCourses[0].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'Microservices Architecture', duration: '2.5 hrs', status: 'completed' },
                { title: 'API Gateway Patterns', duration: '2 hrs', status: 'in-progress' },
                { title: 'Distributed Databases', duration: '3 hrs', status: 'locked' },
                { title: 'Cloud Deployment', duration: '2.5 hrs', status: 'locked' },
              ].map((module, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{module.title}</p>
                    <p className="text-xs text-muted-foreground">{module.duration}</p>
                  </div>
                  <Badge
                    className={`${
                      module.status === 'completed'
                        ? 'bg-accent/20 text-accent'
                        : module.status === 'in-progress'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {module.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
