'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Code, Award } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function PortfolioPage() {
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform with payment integration',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#',
      github: '#',
      featured: true,
    },
    {
      title: 'Real-time Chat Application',
      description: 'Real-time messaging app with WebSocket integration',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#',
      featured: true,
    },
    {
      title: 'Task Management System',
      description: 'Collaborative task management with team features',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      link: '#',
      github: '#',
      featured: false,
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Portfolio</h1>
        <p className="text-muted-foreground">
          Showcase your best work and projects.
        </p>
      </motion.div>

      {/* Portfolio Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Projects', value: '3', icon: '📁' },
          { label: 'Total Views', value: '245', icon: '👁' },
          { label: 'Skill Endorsements', value: '12', icon: '⭐' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Portfolio URL */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Portfolio URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://yourportfolio.com"
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
              />
              <Button>Save URL</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Projects */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter((p) => p.featured)
            .map((project, idx) => (
              <Card
                key={idx}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <Badge className="bg-accent/20 text-accent mb-3">Featured</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
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

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2" size="sm">
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Code className="w-4 h-4" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </motion.div>

      {/* All Projects */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">All Projects</h2>
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <Badge className="bg-accent/20 text-accent">Featured</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
