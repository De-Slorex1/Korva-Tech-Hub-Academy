'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockAssignments } from '@/lib/mock-data'
import { FileText, AlertCircle, CheckCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AssignmentsPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Assignments</h1>
        <p className="text-muted-foreground">
          Submit and track your assignment progress.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: '12', icon: FileText },
          { label: 'Completed', value: '10', icon: CheckCircle },
          { label: 'Pending Review', value: '2', icon: AlertCircle },
          { label: 'Average Grade', value: '94%', icon: CheckCircle },
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

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {assignment.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {assignment.course}
                        </p>
                      </div>
                      <Badge
                        className={`${
                          assignment.status === 'Graded'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {assignment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Grade</p>
                        <p className="text-lg font-semibold text-accent">
                          {assignment.grade}/{assignment.maxGrade}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Percentage</p>
                        <p className="text-lg font-semibold text-foreground">
                          {Math.round((assignment.grade / assignment.maxGrade) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                        <p className="text-sm text-foreground">{assignment.dueDate}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No pending assignments.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {assignment.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {assignment.dueDate}
                        </p>
                      </div>
                      <Badge className="bg-accent/20 text-accent">
                        {assignment.grade}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
