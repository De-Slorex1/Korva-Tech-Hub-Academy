'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Megaphone, Pin, Clock } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: 'New Course: Advanced Web Performance Optimization',
      content:
        'We&apos;re excited to announce a new course on web performance optimization. Learn techniques to make your applications lightning fast.',
      author: 'Admin',
      date: '2 hours ago',
      type: 'Course',
      pinned: true,
    },
    {
      id: 2,
      title: 'Career Fair Happening Next Week!',
      content:
        'Join us for our annual career fair where you can meet recruiters from top tech companies. Register now to reserve your spot.',
      author: 'Career Team',
      date: '1 day ago',
      type: 'Event',
      pinned: true,
    },
    {
      id: 3,
      title: 'Mentoring Sessions Schedule',
      content:
        'New mentoring session slots are now available. Book your 1-on-1 session with your mentor to discuss your progress.',
      author: 'Support',
      date: '3 days ago',
      type: 'Mentoring',
      pinned: false,
    },
    {
      id: 4,
      title: 'Certificate Program Updates',
      content:
        'We&apos;ve updated the certificate requirements. Check your profile to see the new milestones you need to achieve.',
      author: 'Academic Team',
      date: '5 days ago',
      type: 'Certification',
      pinned: false,
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Announcements</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest news and updates.
        </p>
      </motion.div>

      {/* Pinned Announcements */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Pin className="w-5 h-5 text-accent" />
          Important
        </h2>
        <div className="space-y-4">
          {announcements
            .filter((a) => a.pinned)
            .map((announcement) => (
              <Card
                key={announcement.id}
                className="bg-card border-2 border-accent/30 hover:border-accent/50 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Megaphone className="w-5 h-5 text-accent flex-shrink-0" />
                      <h3 className="text-lg font-bold text-foreground">
                        {announcement.title}
                      </h3>
                    </div>
                    <Badge className="bg-accent/20 text-accent whitespace-nowrap ml-4">
                      {announcement.type}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {announcement.content}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{announcement.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {announcement.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </motion.div>

      {/* All Announcements */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">All Announcements</h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-foreground flex-1">
                    {announcement.title}
                  </h3>
                  <Badge
                    className={`whitespace-nowrap ml-4 ${
                      announcement.type === 'Event'
                        ? 'bg-purple-500/20 text-purple-300'
                        : announcement.type === 'Course'
                        ? 'bg-accent/20 text-accent'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {announcement.type}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {announcement.content}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{announcement.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {announcement.date}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
