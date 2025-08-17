"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Clock, Zap, Target, Award, Flame } from "lucide-react"

const weeklyData = [
  { day: "Mon", workouts: 1, exp: 150 },
  { day: "Tue", workouts: 0, exp: 0 },
  { day: "Wed", workouts: 2, exp: 300 },
  { day: "Thu", workouts: 1, exp: 180 },
  { day: "Fri", workouts: 1, exp: 120 },
  { day: "Sat", workouts: 2, exp: 250 },
  { day: "Sun", workouts: 1, exp: 200 },
]

const monthlyGoals = [
  { name: "Workout Days", current: 18, target: 25, unit: "days" },
  { name: "Total EXP", current: 8450, target: 12000, unit: "exp" },
  { name: "Streak Record", current: 7, target: 30, unit: "days" },
  { name: "Achievements", current: 4, target: 10, unit: "unlocked" },
]

export default function StatsPage() {
  const totalWeeklyWorkouts = weeklyData.reduce((sum, day) => sum + day.workouts, 0)
  const totalWeeklyExp = weeklyData.reduce((sum, day) => sum + day.exp, 0)
  const maxWorkouts = Math.max(...weeklyData.map((day) => day.workouts))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-400" />
          Your Stats
        </h1>
        <p className="text-slate-400">Track your fitness journey progress</p>
      </div>

      {/* Weekly Overview */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cyan-400" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{totalWeeklyWorkouts}</p>
              <p className="text-slate-400 text-sm">Workouts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{totalWeeklyExp.toLocaleString()}</p>
              <p className="text-slate-400 text-sm">EXP Earned</p>
            </div>
          </div>

          {/* Weekly Chart */}
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="text-slate-400 text-sm w-8">{day.day}</span>
                <div className="flex-1 bg-white/10 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${maxWorkouts > 0 ? (day.workouts / maxWorkouts) * 100 : 0}%` }}
                  >
                    {day.workouts > 0 && <span className="text-white text-xs font-medium">{day.workouts}</span>}
                  </div>
                </div>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">+{day.exp}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goals */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-yellow-400" />
            Monthly Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {monthlyGoals.map((goal, index) => {
            const percentage = (goal.current / goal.target) * 100
            const isCompleted = percentage >= 100

            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{goal.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                    </span>
                    {isCompleted && <Award className="h-4 w-4 text-yellow-400" />}
                  </div>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-2 bg-white/20" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">4.2h</p>
            <p className="text-slate-400 text-sm">Avg. Workout Time</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-slate-400 text-sm">Current Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-400" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-white font-medium">Great Progress!</p>
              <p className="text-slate-400 text-sm">You're 20% more active than last week</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <Target className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-white font-medium">Almost There!</p>
              <p className="text-slate-400 text-sm">7 more workouts to reach your monthly goal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
