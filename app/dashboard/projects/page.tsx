'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockProjects } from '@/lib/mock-data'
import { Code2, Calendar, Users, Zap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ProjectsPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Projects</h1>
        <p className="text-muted-foreground">
          Build real-world projects and showcase your portfolio.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Projects', value: '3', icon: Code2 },
          { label: 'Completed', value: '1', icon: Zap },
          { label: 'In Progress', value: '1', icon: Calendar },
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
          <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6 space-y-4">
            {mockProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            className="bg-primary/20 text-primary text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge
                      className={`whitespace-nowrap ml-4 ${
                        project.status === 'Completed'
                          ? 'bg-accent/20 text-accent'
                          : project.status === 'In Progress'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-semibold text-accent">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent/70"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Deadline: {project.deadline}
                    </span>
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {mockProjects
              .filter((p) => p.status === 'In Progress')
              .map((project) => (
                <Card
                  key={project.id}
                  className="bg-card border-border"
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      Continue Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="mt-6 space-y-4">
            {mockProjects
              .filter((p) => p.status === 'Completed')
              .map((project) => (
                <Card key={project.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="planned" className="mt-6 space-y-4">
            {mockProjects
              .filter((p) => p.status === 'Planned')
              .map((project) => (
                <Card key={project.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <Button className="mt-4 w-full" variant="outline">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
