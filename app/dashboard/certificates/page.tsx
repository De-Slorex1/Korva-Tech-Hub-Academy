'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockCertificates } from '@/lib/mock-data'
import { Award, Download, Share2, Trophy } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CertificatesPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Certificates</h1>
        <p className="text-muted-foreground">
          Track your certifications and achievements.
        </p>
      </motion.div>

      {/* Certificate Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Earned', value: '2', icon: Trophy, color: 'text-accent' },
          { label: 'In Progress', value: '1', icon: Award, color: 'text-primary' },
          { label: 'Available', value: '5', icon: Award, color: 'text-muted-foreground' },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="pt-6">
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </motion.div>

      {/* Active Certificates */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Your Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCertificates.map((cert) => (
            <Card
              key={cert.id}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <Badge
                    className={`whitespace-nowrap ${
                      cert.status === 'Completed'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {cert.status}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {cert.completed}/{cert.total} modules completed
                </p>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-bold text-accent">
                      {cert.progress}%
                    </span>
                  </div>
                  <Progress value={cert.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  {cert.status === 'Completed' && (
                    <>
                      <Button className="w-full gap-2" variant="outline">
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </Button>
                      <Button className="w-full gap-2" variant="outline">
                        <Share2 className="w-4 h-4" />
                        Share on LinkedIn
                      </Button>
                    </>
                  )}
                  {cert.status === 'In Progress' && (
                    <Button className="w-full">Continue Learning</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Achievement Badge */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Quick Learner', description: 'Complete 10 lessons in a week' },
            { title: 'Code Master', description: 'Submit 5 projects' },
            { title: 'Community Helper', description: 'Help 10 peers in discussions' },
            { title: 'Consistency Champion', description: '30 day learning streak' },
          ].map((badge, idx) => (
            <Card key={idx} className="bg-card border-border text-center">
              <CardContent className="pt-6">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <p className="font-semibold text-foreground mb-1">{badge.title}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
