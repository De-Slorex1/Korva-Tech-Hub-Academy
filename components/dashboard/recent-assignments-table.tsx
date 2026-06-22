import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface AssignmentProps {
  id: string
  title: string
  status: string
  grade: number
  maxGrade: number
  dueDate: string
  course: string
}

interface RecentAssignmentsTableProps {
  assignments: AssignmentProps[]
}

export default function RecentAssignmentsTable({
  assignments,
}: RecentAssignmentsTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-foreground">Recent Assignments</CardTitle>
        <Button variant="ghost" size="sm" className="gap-2">
          View All <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                  ASSIGNMENT
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                  STATUS
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                  GRADE
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground">
                  DUE DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {assignment.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {assignment.course}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={`${
                        assignment.status === 'Graded'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {assignment.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm font-semibold text-foreground">
                      {assignment.grade}/{assignment.maxGrade}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-muted-foreground">
                      {assignment.dueDate}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
