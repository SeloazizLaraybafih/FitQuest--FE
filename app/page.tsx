'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Coins,
  Target,
  Flame,
  Calendar,
  TrendingUp,
  Zap,
  Award,
  CheckCircle,
} from 'lucide-react'
import FitnessSprite from '@/components/fitness-sprite'
import { redirect, useRouter } from 'next/navigation'

export default function FitnessHub() {
  const router = useRouter()
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true') // mark for this tab session
      router.push('/login')
    }
  }, [router])

  const [currentExp] = useState(2847)
  const [maxExp] = useState(5000)
  const [coins] = useState(1250)
  const [dailyGoalProgress] = useState(75)
  const [currentLevel] = useState(12)
  const [streak] = useState(7)

  // Consistency stats
  const [totalExp] = useState(8450)
  const [weeklyWorkouts] = useState(6)
  const [weeklyExpGained] = useState(750)
  const [monthlyCompleted] = useState(22) // completed workout days

  // Weekly workout data (in hours)
  const weeklyData = [
    { day: 'Sun', hours: 1.5, completed: true },
    { day: 'Mon', hours: 1.0, completed: true },
    { day: 'Tue', hours: 0.75, completed: true },
    { day: 'Wed', hours: 1.25, completed: true },
    { day: 'Thu', hours: 0.5, completed: true },
    { day: 'Fri', hours: 0.8, completed: true },
    { day: 'Sat', hours: 0, completed: false }, // Today - not completed yet
  ]

  const maxHours = Math.max(...weeklyData.map((d) => d.hours), 2) // Minimum scale of 2 hours

  const expPercentage = (currentExp / maxExp) * 100

  // Determine sprite animation based on activity
  const getSpriteAnimation = () => {
    if (dailyGoalProgress >= 100) return 'celebrating'
    if (dailyGoalProgress >= 50) return 'active'
    return 'idle'
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8 pt-4'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Welcome back!</h1>
          <p className='text-slate-400'>Stay consistent, stay strong! 💪</p>
        </div>
        <Button
          size='icon'
          className='bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
        >
          <Calendar className='h-5 w-5 text-white' />
        </Button>
      </div>

      {/* Avatar & EXP Section */}
      <div className='flex flex-col items-center mb-8'>
        <div className='relative mb-6'>
          {/* Glowing EXP Ring */}
          <div className='relative w-32 h-32'>
            <svg
              className='w-32 h-32 transform -rotate-90'
              viewBox='0 0 120 120'
            >
              {/* Background ring */}
              <circle
                cx='60'
                cy='60'
                r='54'
                stroke='rgba(255,255,255,0.1)'
                strokeWidth='4'
                fill='none'
              />
              {/* Progress ring */}
              <circle
                cx='60'
                cy='60'
                r='54'
                stroke='url(#gradient)'
                strokeWidth='4'
                fill='none'
                strokeLinecap='round'
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${
                  2 * Math.PI * 54 * (1 - expPercentage / 100)
                }`}
                className='drop-shadow-[0_0_10px_#06b6d4]'
              />
              <defs>
                <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                  <stop offset='0%' stopColor='#06b6d4' />
                  <stop offset='100%' stopColor='#d946ef' />
                </linearGradient>
              </defs>
            </svg>

            {/* Animated Sprite Avatar */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden'>
                <FitnessSprite
                  size={80}
                  animationState={getSpriteAnimation()}
                  className='drop-shadow-lg'
                />
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <Badge className='absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0 px-3 py-1'>
            LV {currentLevel}
          </Badge>
        </div>

        {/* EXP Info */}
        <div className='text-center mb-2'>
          <p className='text-white font-semibold text-lg'>
            {currentExp.toLocaleString('en-US')} /{' '}
            {maxExp.toLocaleString('en-US')} EXP
          </p>
          <p className='text-slate-400 text-sm'>
            {(maxExp - currentExp).toLocaleString('en-US')} EXP to next level
          </p>
        </div>

        {/* Streak - Enhanced */}
        <div className='flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md border border-orange-400/30 rounded-full px-4 py-2'>
          <Flame className='h-4 w-4 text-orange-400' />
          <span className='text-white text-sm font-medium'>
            {streak} day streak
          </span>
          <Badge className='bg-orange-500/30 text-orange-200 border-0 text-xs'>
            🔥 Hot!
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-2 gap-4 mb-8'>
        {/* Coins Card */}
        <Card className='bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500'>
                <Coins className='h-5 w-5 text-white' />
              </div>
              <div>
                <p className='text-slate-400 text-sm'>Coins</p>
                <p className='text-white font-bold text-lg'>
                  {coins.toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Goal Card */}
        <Card className='bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500'>
                <Target className='h-5 w-5 text-white' />
              </div>
              <div className='flex-1'>
                <p className='text-slate-400 text-sm'>Daily Goal</p>
                <p className='text-white font-bold text-lg'>
                  {dailyGoalProgress}%
                </p>
                <Progress
                  value={dailyGoalProgress}
                  className='h-1 mt-1 bg-white/20'
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consistency Hero Section */}
      <Card className='bg-gradient-to-r from-green-800/80 via-emerald-800/80 to-teal-800/80 backdrop-blur-md border border-green-400/80 mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]'>
        <CardHeader>
          <CardTitle className='text-white flex items-center gap-2'>
            <div className='p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500'>
              <CheckCircle className='h-5 w-5 text-white' />
            </div>
            Consistency Tracker
            <Badge className='bg-green-500/30 text-green-200 border-green-400/30 animate-pulse'>
              Main Goal
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Weekly Bar Chart */}
          <div>
            <h4 className='text-white font-medium mb-4'>
              This Week's Progress
            </h4>
            <div className='relative'>
              {/* Chart Container */}
              <div className='h-32 flex items-end justify-between gap-2 px-2'>
                {weeklyData.map((day, index) => {
                  const heightPercentage = (day.hours / maxHours) * 100
                  const isToday = index === 6 // Saturday is today in this example

                  return (
                    <div
                      key={day.day}
                      className='flex flex-col items-center flex-1'
                    >
                      {/* Bar */}
                      <div className='w-full flex flex-col justify-end h-24 mb-2'>
                        <div
                          className={`w-full rounded-t-sm transition-all duration-500 ${
                            day.completed
                              ? 'bg-gradient-to-t from-green-500 to-emerald-400'
                              : isToday
                              ? 'bg-gradient-to-t from-gray-600 to-gray-500 border-2 border-dashed border-gray-400'
                              : 'bg-gradient-to-t from-gray-700 to-gray-600'
                          }`}
                          style={{
                            height: `${Math.max(heightPercentage, 8)}%`,
                          }}
                        />
                      </div>
                      {/* Day Label */}
                      <span
                        className={`text-xs font-medium ${
                          isToday ? 'text-cyan-400' : 'text-slate-400'
                        }`}
                      >
                        {day.day}
                      </span>
                      {/* Hours Label */}
                      <span className='text-xs text-slate-500 mt-1'>
                        {day.hours > 0
                          ? `${day.hours}h`
                          : isToday
                          ? 'Today'
                          : '0h'}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Y-axis labels */}
              <div className='absolute left-0 top-0 h-24 flex flex-col justify-between text-xs text-slate-500'>
                <span>{maxHours}h</span>
                <span>{(maxHours * 0.5).toFixed(1)}h</span>
                <span>0h</span>
              </div>
            </div>
          </div>

          {/* Active Days Counter */}
          <div className='flex justify-center'>
            <div className='text-center p-4 bg-white/10 rounded-lg border border-green-400/30'>
              <p className='text-3xl font-bold text-green-400'>
                {monthlyCompleted}
              </p>
              <p className='text-slate-300 text-sm'>Active Days This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <div className='mb-8'>
        <h2 className='text-white font-semibold mb-4 flex items-center gap-2'>
          <Target className='h-5 w-5 text-yellow-400' />
          Daily Quests
        </h2>
        <div className='space-y-3'>
          {/* Quest 1 - Strength Training */}
          <Card className='bg-gradient-to-r from-red-500/80 to-orange-500/80 backdrop-blur-md border border-red-400/80'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>💪</div>
                  <div>
                    <p className='text-white font-semibold text-sm'>
                      Complete Strength Training
                    </p>
                    <p className='text-slate-300 text-xs'>
                      Earn bonus EXP for strength workouts today
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <Badge className='bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-1'>
                    +50 EXP
                  </Badge>
                  <p className='text-slate-400 text-xs'>0/1 completed</p>
                </div>
              </div>
              <Progress value={0} className='h-2 mt-3 bg-white/20' />
            </CardContent>
          </Card>

          {/* Quest 2 - Any Workout */}
          <Card className='bg-gradient-to-r from-cyan-500/80 to-blue-500/80 backdrop-blur-md border border-cyan-400/80'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>🎯</div>
                  <div>
                    <p className='text-white font-semibold text-sm'>
                      Stay Active
                    </p>
                    <p className='text-slate-300 text-xs'>
                      Complete any workout for 30+ minutes
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <Badge className='bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-1'>
                    +30 EXP
                  </Badge>
                  <p className='text-green-400 text-xs'>✓ Completed</p>
                </div>
              </div>
              <Progress value={100} className='h-2 mt-3 bg-white/20' />
            </CardContent>
          </Card>

          {/* Quest 3 - Streak Bonus */}
          <Card className='bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-md border border-purple-400/80'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='text-2xl'>🔥</div>
                  <div>
                    <p className='text-white font-semibold text-sm'>
                      Maintain Streak
                    </p>
                    <p className='text-slate-300 text-xs'>
                      Keep your workout streak alive
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <Badge className='bg-orange-500/20 text-orange-400 border-orange-500/30 mb-1'>
                    +25 EXP
                  </Badge>
                  <p className='text-green-400 text-xs'>✓ Completed</p>
                </div>
              </div>
              <Progress value={100} className='h-2 mt-3 bg-white/20' />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Stats */}
      <Card className='bg-white/10 backdrop-blur-md border border-white/20'>
        <CardHeader>
          <CardTitle className='text-white flex items-center gap-2'>
            <TrendingUp className='h-5 w-5 text-cyan-400' />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Weekly Stats */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='text-center p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30'>
              <div className='flex items-center justify-center mb-2'>
                <Zap className='h-5 w-5 text-cyan-400' />
              </div>
              <p className='text-2xl font-bold text-white'>{weeklyWorkouts}</p>
              <p className='text-slate-300 text-sm'>Workouts This Week</p>
            </div>
            <div className='text-center p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30'>
              <div className='flex items-center justify-center mb-2'>
                <Award className='h-5 w-5 text-purple-400' />
              </div>
              <p className='text-2xl font-bold text-white'>{weeklyExpGained}</p>
              <p className='text-slate-300 text-sm'>EXP This Week</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div>
            <div className='flex justify-between text-sm mb-2'>
              <span className='text-slate-400'>Total EXP Earned</span>
              <span className='text-white font-semibold'>
                {totalExp.toLocaleString('en-US')}
              </span>
            </div>
            <Progress value={85} className='h-2 bg-white/20' />
          </div>

          {/* Consistency Insight */}
          <div className='flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg'>
            <CheckCircle className='h-5 w-5 text-green-400' />
            <div>
              <p className='text-white font-medium'>Great Weekly Progress!</p>
              <p className='text-slate-400 text-sm'>
                You've been active 6 out of 7 days this week. Keep it up!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
