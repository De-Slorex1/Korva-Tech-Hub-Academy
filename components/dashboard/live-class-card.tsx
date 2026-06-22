import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'

interface LiveClassCardProps {
  liveClass: {
    id: string
    title: string
    instructor: {
      name: string
      avatar: string
    }
    date: string
    time: string
    duration: string
    status: string
    description: string
  }
}

export default function LiveClassCard({ liveClass }: LiveClassCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3">
          {liveClass.status.toUpperCase()}
        </Badge>
        <h3 className="text-lg font-bold text-foreground mb-1">{liveClass.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{liveClass.description}</p>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <img
            src={liveClass.instructor.avatar}
            alt={liveClass.instructor.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="text-muted-foreground">Instructor</p>
            <p className="font-semibold text-foreground">{liveClass.instructor.name}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{liveClass.date}, {liveClass.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{liveClass.duration}</span>
          </div>
        </div>

        <Button className="w-full bg-primary hover:bg-primary/90">Join Class</Button>
      </CardContent>
    </Card>
  )
}
