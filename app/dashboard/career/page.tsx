'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Briefcase, CheckCircle, Target, TrendingUp, AlertCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CareerPage() {
  const careerItems = [
    {
      title: 'Portfolio',
      status: 'In Progress',
      progress: 80,
      description: 'Showcase your projects and skills',
      action: 'Build Portfolio',
    },
    {
      title: 'GitHub Projects',
      status: 'In Progress',
      progress: 75,
      description: '6 out of 8 projects completed',
      action: 'View Repos',
    },
    {
      title: 'LinkedIn Profile',
      status: 'Complete',
      progress: 100,
      description: 'Professional profile ready',
      action: 'View Profile',
    },
    {
      title: 'CV/Resume',
      status: 'Complete',
      progress: 100,
      description: 'Upload and manage your resume',
      action: 'Update CV',
    },
    {
      title: 'Interview Prep',
      status: 'Not Started',
      progress: 0,
      description: 'Prepare for technical interviews',
      action: 'Start Prep',
    },
    {
      title: 'Job Applications',
      status: 'In Progress',
      progress: 40,
      description: '4 applications submitted',
      action: 'Apply Now',
    },
  ]

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Career Hub</h1>
        <p className="text-muted-foreground">
          Prepare for your dream job with comprehensive career tools.
        </p>
      </motion.div>

      {/* Career Readiness Overview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-accent" />
              Career Readiness Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Overall Progress
                  </span>
                  <span className="text-sm font-bold text-accent">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                You&apos;re on track! Complete the remaining items to boost your career readiness.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Career Readiness Checklist */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Career Readiness Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerItems.map((item, idx) => (
            <Card
              key={idx}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <Badge
                    className={`whitespace-nowrap ${
                      item.status === 'Complete'
                        ? 'bg-accent/20 text-accent'
                        : item.status === 'In Progress'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-bold text-accent">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-1.5" />
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  {item.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Job Opportunities */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recommended Opportunities
        </h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                {
                  title: 'Junior Full Stack Developer',
                  company: 'Tech Startup',
                  location: 'Lagos, Nigeria',
                  salary: '₦2M - ₦3M/month',
                },
                {
                  title: 'Frontend Engineer',
                  company: 'E-commerce Platform',
                  location: 'Remote',
                  salary: '₦1.8M - ₦2.8M/month',
                },
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                    <p className="text-xs text-accent mt-1">{job.salary}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
