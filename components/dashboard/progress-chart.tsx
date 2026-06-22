'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockWeeklyProgress } from '@/lib/mock-data'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ProgressChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground text-base">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockWeeklyProgress}>
            <defs>
              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06d6a0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
            <XAxis dataKey="day" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a2e',
                border: '1px solid #2d2d44',
                borderRadius: '8px',
                color: '#f1f5f9',
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="#06d6a0"
              fillOpacity={1}
              fill="url(#colorProgress)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Study Time</p>
            <p className="text-sm font-semibold text-foreground">27 hrs</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Lessons</p>
            <p className="text-sm font-semibold text-foreground">18</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Quizzes</p>
            <p className="text-sm font-semibold text-foreground">12</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
