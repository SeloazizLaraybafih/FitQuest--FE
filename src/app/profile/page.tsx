"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings, Calendar, Award, TrendingUp, Clock, Zap } from "lucide-react"

const achievements = [
  { id: 1, name: "First Steps", description: "Complete your first workout", icon: "🎯", unlocked: true },
  { id: 2, name: "Week Warrior", description: "Maintain a 7-day streak", icon: "🔥", unlocked: true },
  { id: 3, name: "Century Club", description: "Earn 100 total workouts", icon: "💯", unlocked: false },
  { id: 4, name: "EXP Master", description: "Reach 10,000 total EXP", icon: "⚡", unlocked: true },
  { id: 5, name: "Leaderboard King", description: "Reach #1 on daily leaderboard", icon: "👑", unlocked: false },
  { id: 6, name: "Consistency Pro", description: "Maintain a 30-day streak", icon: "📅", unlocked: false },
]

const workoutHistory = [
  { date: "Today", type: "Strength Training", duration: "45 min", exp: 150, icon: "💪" },
  { date: "Yesterday", type: "Cardio Run", duration: "30 min", exp: 120, icon: "🏃‍♂️" },
  { date: "2 days ago", type: "Yoga Session", duration: "60 min", exp: 100, icon: "🧘‍♂️" },
  { date: "3 days ago", type: "HIIT Workout", duration: "25 min", exp: 180, icon: "⚡" },
  { date: "4 days ago", type: "Swimming", duration: "40 min", exp: 140, icon: "🏊‍♂️" },
]

export default function UserProfile() {
  const [currentExp] = useState(2847)
  const [maxExp] = useState(5000)
  const [totalWorkouts] = useState(87)
  const [currentStreak] = useState(7)
  const [totalExp] = useState(8450)
  const [currentLevel] = useState(12)
  const [coins] = useState(1250)

  const expPercentage = (currentExp / maxExp) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>
        <Button size="icon" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with EXP Ring */}
            <div className="relative mb-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="44" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    stroke="url(#profileGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - expPercentage / 100)}`}
                    className="drop-shadow-[0_0_8px_#06b6d4]"
                  />
                  <defs>
                    <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
                <Avatar className="absolute inset-0 m-auto w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-purple-500 text-2xl">
                    🏃‍♂️
                  </AvatarFallback>
                </Avatar>
              </div>
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
                Level {currentLevel}
              </Badge>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">FitnessHero</h2>
            <p className="text-slate-400 mb-4">
              {currentExp.toLocaleString()} / {maxExp.toLocaleString()} EXP
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{totalWorkouts}</p>
                <p className="text-slate-400 text-sm">Workouts</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-400">{currentStreak}</p>
                <p className="text-slate-400 text-sm">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{coins.toLocaleString()}</p>
                <p className="text-slate-400 text-sm">Coins</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20">
          <TabsTrigger value="achievements" className="data-[state=active]:bg-white/20 text-white">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-white/20 text-white">
            History
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-white/20 text-white">
            Stats
          </TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="mt-6">
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`backdrop-blur-md border transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-white/10 border-white/20 hover:bg-white/15"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${achievement.unlocked ? "" : "grayscale"}`}>{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.unlocked ? "text-white" : "text-slate-400"}`}>
                        {achievement.name}
                      </h3>
                      <p className="text-slate-400 text-sm">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Award className="h-3 w-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {workoutHistory.map((workout, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{workout.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{workout.type}</h3>
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {workout.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workout.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">+{workout.exp} EXP</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="mt-6">
          <div className="grid gap-6">
            {/* Overall Progress */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Total EXP Earned</span>
                    <span className="text-white font-semibold">{totalExp.toLocaleString()}</span>
                  </div>
                  <Progress value={85} className="h-2 bg-white/20" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Workout Consistency</span>
                    <span className="text-white font-semibold">87%</span>
                  </div>
                  <Progress value={87} className="h-2 bg-white/20" />
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-400">5</p>
                    <p className="text-slate-400 text-sm">Workouts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">750</p>
                    <p className="text-slate-400 text-sm">EXP Gained</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
