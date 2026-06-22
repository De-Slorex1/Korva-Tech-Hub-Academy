import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface CourseCardProps {
  course: {
    id: string
    title: string
    description: string
    progress: number
    status: string
    lessons: number
    completedLessons: number
  }
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <Badge className="bg-accent/20 text-accent border border-accent/30 mb-3">
          {course.status}
        </Badge>
        <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                {course.completedLessons}/{course.lessons} lessons
              </span>
              <span className="text-xs font-semibold text-accent">
                {course.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent/70"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <Button className="w-full gap-2">
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
