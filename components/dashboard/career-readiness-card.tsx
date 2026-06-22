import { Card, CardContent } from '@/components/ui/card'
import { Target } from 'lucide-react'

export default function CareerReadinessCard({ progress }: { progress: number }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-muted-foreground">Career Readiness</h3>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <div className="text-3xl font-bold text-accent">{progress}%</div>
        </div>
        <p className="text-xs text-muted-foreground">You&apos;re on track!</p>
      </CardContent>
    </Card>
  )
}
