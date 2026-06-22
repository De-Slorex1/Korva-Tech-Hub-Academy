import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Calendar } from 'lucide-react'

interface CohortCardProps {
  cohort: {
    id: string
    name: string
    track: string
    mentor: {
      name: string
      avatar: string
    }
    members: number
    classDays: string
  }
}

export default function CohortCard({ cohort }: CohortCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Badge className="bg-accent/20 text-accent border border-accent/30 mb-3">
          Cohort Info
        </Badge>
        <h3 className="text-lg font-bold text-foreground mb-1">{cohort.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{cohort.track}</p>

        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <img
            src={cohort.mentor.avatar}
            alt={cohort.mentor.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="text-muted-foreground">Mentor</p>
            <p className="font-semibold text-foreground">{cohort.mentor.name}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{cohort.members} members in cohort</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{cohort.classDays}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full">
          View Cohort Details
        </Button>
      </CardContent>
    </Card>
  )
}
