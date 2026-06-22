import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Award } from 'lucide-react'

export default function CertificatesCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground text-base">
          <Award className="w-5 h-5 text-accent" />
          Certificate Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Modules Completed</span>
            <Badge className="bg-accent/20 text-accent">14/20</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Projects Submitted</span>
            <Badge className="bg-primary/20 text-primary">4/5</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Attendance</span>
            <Badge className="bg-green-500/20 text-green-300">92%</Badge>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          View Certificate Path
        </Button>
      </CardContent>
    </Card>
  )
}
