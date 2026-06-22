import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Calendar, Award } from 'lucide-react'

export default function MentorCard() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <h3 className="text-base font-bold text-foreground mb-4">Mentor Support</h3>

        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="Mentor"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-foreground">Message Mentor</p>
            <p className="text-xs text-muted-foreground">Chat with your mentor</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Book Session</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Schedule a 1:1 session</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
            <span>Open Support Ticket</span>
          </div>
        </div>

        <Button className="w-full gap-2" variant="outline">
          <MessageSquare className="w-4 h-4" />
          View All Conversations
        </Button>
      </CardContent>
    </Card>
  )
}
