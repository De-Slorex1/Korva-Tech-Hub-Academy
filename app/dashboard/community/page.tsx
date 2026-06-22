'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Users, Heart, Share2 } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CommunityPage() {
  const discussions = [
    {
      author: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      title: 'Best practices for React hooks',
      content: 'Share your experience with custom hooks and state management...',
      replies: 12,
      likes: 24,
      time: '2 hours ago',
    },
    {
      author: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      title: 'Microservices deployment strategies',
      content: 'Let&apos;s discuss the pros and cons of different deployment approaches...',
      replies: 8,
      likes: 15,
      time: '4 hours ago',
    },
    {
      author: 'Emma Okonkwo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      title: 'Career opportunities in Lagos tech scene',
      content: 'Sharing insights about job market and company culture...',
      replies: 16,
      likes: 31,
      time: '6 hours ago',
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow learners and share knowledge.
        </p>
      </motion.div>

      {/* Community Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Members', value: '156', icon: Users },
          { label: 'Discussions', value: '432', icon: MessageCircle },
          { label: 'Posts This Week', value: '47', icon: Share2 },
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

      {/* Start Discussion */}
      <motion.div variants={itemVariants}>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="You"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="Start a discussion..."
                className="flex-1 px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="w-full">Post Discussion</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Discussions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Discussions</h2>
        <div className="space-y-4">
          {discussions.map((discussion, idx) => (
            <Card
              key={idx}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={discussion.avatar}
                    alt={discussion.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground">
                        {discussion.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {discussion.time}
                      </p>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {discussion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {discussion.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {discussion.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {discussion.likes} likes
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Discussion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
