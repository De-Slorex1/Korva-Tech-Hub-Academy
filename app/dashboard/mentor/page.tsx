'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Star, MessageSquare, Video } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function MentorPage() {
  const mentors = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Senior Full Stack Engineer',
      expertise: ['Full Stack', 'Microservices', 'Cloud Architecture'],
      rating: 4.9,
      reviews: 128,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Experienced engineer with 10+ years in building scalable web applications',
      availability: 'Available',
    },
    {
      id: 2,
      name: 'Emma Okonkwo',
      title: 'DevOps & Cloud Specialist',
      expertise: ['DevOps', 'AWS', 'Kubernetes'],
      rating: 4.8,
      reviews: 95,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      bio: 'Cloud infrastructure expert helping teams scale their applications',
      availability: 'Available',
    },
    {
      id: 3,
      name: 'Sarah Chen',
      title: 'Frontend Architecture Lead',
      expertise: ['React', 'Performance', 'UI/UX'],
      rating: 4.7,
      reviews: 87,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Passionate about building performant and beautiful web interfaces',
      availability: 'Available',
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
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Mentor Support</h1>
        <p className="text-muted-foreground">
          Get guidance from experienced mentors in your learning journey.
        </p>
      </motion.div>

      {/* Your Mentor */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Your Assigned Mentor</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 mb-6">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="John"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">John Doe</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Senior Full Stack Engineer
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4.9 (128 reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {mentors[0].bio}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {mentors[0].expertise.map((skill, idx) => (
                <Badge key={idx} className="bg-primary/20 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <MessageSquare className="w-4 h-4" />
                Send Message
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Calendar className="w-4 h-4" />
                Book Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* All Mentors */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Connect with Other Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card
              key={mentor.id}
              className="bg-card border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-foreground">{mentor.name}</h3>
                    <p className="text-xs text-muted-foreground">{mentor.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(mentor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {mentor.rating} ({mentor.reviews})
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Video className="w-3 h-3" />
                    Video Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">FAQ</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6 space-y-4">
            {[
              {
                q: 'How do I book a mentoring session?',
                a: 'Click on any mentor and select "Book Session". Choose your preferred time slot and the mentor will confirm the session.',
              },
              {
                q: 'Can I change my mentor?',
                a: 'Yes, you can request a different mentor anytime from your settings. A new mentor will be assigned within 24 hours.',
              },
              {
                q: 'What if my mentor is not available?',
                a: 'You can message your mentor to discuss availability or connect with other available mentors in our network.',
              },
            ].map((item, idx) => (
              <div key={idx} className="pb-4 border-b border-border last:border-0">
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
