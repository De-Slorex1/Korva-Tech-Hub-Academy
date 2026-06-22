'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react'
import { Input } from '@/components/ui/input'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function JobsPage() {
  const jobs = [
    {
      id: 1,
      title: 'Junior Full Stack Developer',
      company: 'TechStartup Lagos',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦2M - ₦3M',
      description: 'Looking for a junior developer to join our growing team',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      featured: true,
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      company: 'E-commerce Platform',
      location: 'Remote',
      type: 'Full-time',
      salary: '₦1.8M - ₦2.8M',
      description: 'Build amazing web experiences with modern frontend technologies',
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      featured: true,
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'FinTech Solutions',
      location: 'Lagos, Nigeria',
      type: 'Full-time',
      salary: '₦2.5M - ₦3.5M',
      description: 'Develop scalable backend systems for financial applications',
      skills: ['Python', 'Django', 'PostgreSQL'],
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Job Opportunities</h1>
        <p className="text-muted-foreground">
          Explore job opportunities from top companies.
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search jobs..."
                className="flex-1 bg-muted border-border"
              />
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Jobs */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Featured Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs
            .filter((j) => j.featured)
            .map((job) => (
              <Card
                key={job.id}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {job.title}
                    </h3>
                    <Bookmark className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {job.company}
                  </p>

                  <p className="text-sm text-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-accent font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline" className="flex-1">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </motion.div>

      {/* All Jobs */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">All Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <Bookmark className="w-5 h-5 text-muted-foreground hover:text-accent cursor-pointer" />
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {job.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium text-foreground">
                      {job.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Salary</p>
                    <p className="text-sm font-medium text-accent">{job.salary}</p>
                  </div>
                  <div className="text-right">
                    <Button size="sm">Apply</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
