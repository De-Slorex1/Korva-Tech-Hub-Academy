import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, MessageCircle } from 'lucide-react'

export default function CommunityCard() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 mb-3">
          Community
        </Badge>
        <h3 className="text-lg font-bold text-foreground mb-1">WhatsApp Community</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect. Collaborate. Grow.
        </p>

        <div className="space-y-3 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground">156 members</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-sm text-foreground">3 New Announcements</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">+124 Active Members</p>
          <Button variant="outline" className="w-full">
            Join Discussion
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
