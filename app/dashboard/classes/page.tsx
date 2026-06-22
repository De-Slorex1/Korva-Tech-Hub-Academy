'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockLiveClasses } from '@/lib/mock-data'
import { Calendar, Clock, Users, Video } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function ClassesPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Live Classes</h1>
        <p className="text-muted-foreground">
          Join scheduled live classes and interact with instructors.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="recorded">Recorded</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockLiveClasses.map((liveClass) => (
                <Card key={liveClass.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <Badge className="bg-purple-500/20 text-purple-300 mb-3">
                      {liveClass.status.toUpperCase()}
                    </Badge>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {liveClass.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {liveClass.description}
                    </p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{liveClass.date}, {liveClass.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{liveClass.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={liveClass.instructor.avatar}
                          alt={liveClass.instructor.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-foreground">
                          {liveClass.instructor.name}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <Video className="w-4 h-4" />
                      Join Class
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  No completed classes yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recorded" className="space-y-4 mt-6">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center py-8">
                  Recorded classes will appear here soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Class Schedule */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-foreground mb-4">Class Schedule</h2>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="space-y-3">
              {[
                { day: 'Saturday', time: '10:00 AM', duration: '2 hrs', class: 'Frontend Development' },
                { day: 'Sunday', time: '2:00 PM', duration: '1.5 hrs', class: 'Backend Architecture' },
                { day: 'Wednesday', time: '7:00 PM', duration: '1 hr', class: 'Q&A Session' },
              ].map((schedule, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-foreground">{schedule.day}</p>
                    <p className="text-sm text-muted-foreground">{schedule.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {schedule.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{schedule.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
