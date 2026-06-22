import { Card, CardContent } from '@/components/ui/card'
import { Flame } from 'lucide-react'

export default function LearningStreakCard({ streak }: { streak: number }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="w-5 h-5 text-orange-500" />
          <h3 className="text-sm font-semibold text-muted-foreground">Learning Streak</h3>
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">{streak} Days</div>
        <p className="text-xs text-muted-foreground">
          Keep it up! Consistency builds mastery.
        </p>
      </CardContent>
    </Card>
  )
}
