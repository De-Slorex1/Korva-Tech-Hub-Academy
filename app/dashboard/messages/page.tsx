'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Send, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function MessagesPage() {
  const conversations = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastMessage: 'Thanks for the code review!',
      time: '2m ago',
      unread: false,
    },
    {
      id: 2,
      name: 'Emma Okonkwo',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      lastMessage: 'Can you review my project?',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'See you at the class tomorrow',
      time: '3h ago',
      unread: false,
    },
    {
      id: 4,
      name: 'Study Group',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study',
      lastMessage: 'Emma: Let&apos;s meet at 7pm',
      time: '5h ago',
      unread: true,
    },
  ]

  const chatMessages = [
    {
      sender: 'John Doe',
      message: 'Hey! How is the microservices project going?',
      time: '2:30 PM',
      isMe: false,
    },
    {
      sender: 'You',
      message: 'Pretty good! Just finished the API gateway module.',
      time: '2:35 PM',
      isMe: true,
    },
    {
      sender: 'John Doe',
      message: 'Nice! Thanks for the code review earlier!',
      time: '2:40 PM',
      isMe: false,
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Messages</h1>
        <p className="text-muted-foreground">
          Chat with mentors, classmates, and study groups.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages"
                  className="pl-10 bg-muted border-border"
                />
              </div>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                      conv.id === 1
                        ? 'bg-primary/20'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <img
                      src={conv.avatar}
                      alt={conv.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-foreground text-sm">
                          {conv.name}
                        </p>
                        {conv.unread && (
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {conv.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border flex flex-col h-96">
            {/* Chat Header */}
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="John"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <CardTitle className="text-foreground">John Doe</CardTitle>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 bg-muted border-border"
                />
                <Button size="sm" className="gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
