'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Trophy, Medal, Crown, ArrowLeft, Zap, Timer } from 'lucide-react'

const leaderboardData = [
  {
    rank: 1,
    username: 'FitWarrior',
    exp: 4850,
    avatar: '🏆',
    isCurrentUser: false,
  },
  {
    rank: 2,
    username: 'IronMike',
    exp: 4720,
    avatar: '💪',
    isCurrentUser: false,
  },
  {
    rank: 3,
    username: 'RunnerGirl',
    exp: 4650,
    avatar: '🏃‍♀️',
    isCurrentUser: false,
  },
  {
    rank: 4,
    username: 'GymBeast',
    exp: 4500,
    avatar: '🦍',
    isCurrentUser: false,
  },
  {
    rank: 5,
    username: 'FlexMaster',
    exp: 4350,
    avatar: '🤸‍♂️',
    isCurrentUser: false,
  },
  { rank: 6, username: 'You', exp: 4200, avatar: '🏃‍♂️', isCurrentUser: true },
  {
    rank: 7,
    username: 'CardioKing',
    exp: 4100,
    avatar: '👑',
    isCurrentUser: false,
  },
  {
    rank: 8,
    username: 'LiftQueen',
    exp: 3950,
    avatar: '👸',
    isCurrentUser: false,
  },
  {
    rank: 9,
    username: 'SpeedDemon',
    exp: 3800,
    avatar: '⚡',
    isCurrentUser: false,
  },
  {
    rank: 10,
    username: 'FitnessFreak',
    exp: 3650,
    avatar: '🔥',
    isCurrentUser: false,
  },
]

export default function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className='h-5 w-5 text-yellow-400' />
      case 2:
        return <Medal className='h-5 w-5 text-gray-300' />
      case 3:
        return <Medal className='h-5 w-5 text-amber-600' />
      default:
        return <span className='text-slate-400 font-bold'>#{rank}</span>
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-amber-500/80 to-yellow-600/80 border-yellow-500/80'
      case 2:
        return 'bg-gradient-to-r from-gray-400/80 to-slate-500/80 border-gray-400/80'
      case 3:
        return 'bg-gradient-to-r from-orange-800/80 to-amber-600/80 border-amber-600/80'
      default:
        return 'bg-white/10 border-white/20'
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br bg- from-slate-900 via-purple-900 to-slate-900 p-4'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6 pt-4'>
        <div className='flex items-center gap-4'>
          <Button
            size='icon'
            variant='ghost'
            className='text-white hover:bg-white/10'
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
          <div>
            <h1 className='text-2xl font-bold text-white flex items-center gap-2'>
              <Trophy className='h-6 w-6 text-yellow-400' />
              Daily Leaderboard
            </h1>
            <p className='text-slate-400 text-sm'>Compete with others today!</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1'>
          <Timer className='h-4 w-4 text-cyan-400' />
          <span className='text-white text-sm font-medium'>Resets in 8h</span>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className='mb-8'>
        <div className='flex items-end justify-center gap-4 mb-6'>
          {/* 2nd Place */}
          <div className='flex flex-col items-center'>
            <div className='relative'>
              <Avatar className='w-16 h-16 border-4 border-gray-300'>
                <AvatarFallback className='bg-gradient-to-br from-gray-400 to-slate-500 text-2xl'>
                  {leaderboardData[1].avatar}
                </AvatarFallback>
              </Avatar>
              <Badge className='absolute -top-2 -right-2 bg-gray-300 text-gray-800 border-0 px-2'>
                2
              </Badge>
            </div>
            <div className='mt-2 text-center'>
              <p className='text-white font-semibold text-sm'>
                {leaderboardData[1].username}
              </p>
              <p className='text-slate-400 text-xs'>
                {leaderboardData[1].exp.toLocaleString()} EXP
              </p>
            </div>
            <div className='w-16 h-12 bg-gradient-to-t from-gray-400 to-gray-300 mt-2 rounded-t-lg'></div>
          </div>

          {/* 1st Place */}
          <div className='flex flex-col items-center'>
            <div className='relative'>
              <Avatar className='w-20 h-20 border-4 border-yellow-400'>
                <AvatarFallback className='bg-gradient-to-br from-yellow-400 to-orange-500 text-3xl'>
                  {leaderboardData[0].avatar}
                </AvatarFallback>
              </Avatar>
              <Badge className='absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 border-0 px-2'>
                1
              </Badge>
              <div className='absolute -top-6 left-1/2 transform -translate-x-1/2'>
                <Crown className='h-6 w-6 text-yellow-400' />
              </div>
            </div>
            <div className='mt-2 text-center'>
              <p className='text-white font-bold'>
                {leaderboardData[0].username}
              </p>
              <p className='text-yellow-400 font-semibold'>
                {leaderboardData[0].exp.toLocaleString()} EXP
              </p>
            </div>
            <div className='w-16 h-16 bg-gradient-to-t from-yellow-500 to-yellow-400 mt-2 rounded-t-lg'></div>
          </div>

          {/* 3rd Place */}
          <div className='flex flex-col items-center'>
            <div className='relative'>
              <Avatar className='w-16 h-16 border-4 border-amber-600'>
                <AvatarFallback className='bg-gradient-to-br from-amber-600 to-yellow-600 text-2xl'>
                  {leaderboardData[2].avatar}
                </AvatarFallback>
              </Avatar>
              <Badge className='absolute -top-2 -right-2 bg-amber-600 text-amber-100 border-0 px-2'>
                3
              </Badge>
            </div>
            <div className='mt-2 text-center'>
              <p className='text-white font-semibold text-sm'>
                {leaderboardData[2].username}
              </p>
              <p className='text-slate-400 text-xs'>
                {leaderboardData[2].exp.toLocaleString()} EXP
              </p>
            </div>
            <div className='w-16 h-8 bg-gradient-to-t from-amber-600 to-amber-500 mt-2 rounded-t-lg'></div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <Card className='bg-white/10 backdrop-blur-md border border-white/20'>
        <CardHeader>
          <CardTitle className='text-white flex items-center gap-2'>
            <Zap className='h-5 w-5 text-cyan-400' />
            Full Rankings
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='space-y-2 p-4'>
            {leaderboardData.map((user) => (
              <Card
                key={user.rank}
                className={`${getRankBg(
                  user.rank
                )} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] ${
                  user.isCurrentUser
                    ? 'ring-2 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                    : ''
                }`}
              >
                <CardContent className='p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center justify-center w-8 h-8'>
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar className='w-10 h-10'>
                        <AvatarFallback className='bg-gradient-to-br from-cyan-400 to-purple-500 text-lg'>
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p
                          className={`font-semibold ${
                            user.isCurrentUser
                              ? 'text-yellow-400'
                              : 'text-white'
                          }`}
                        >
                          {user.username}
                          {user.isCurrentUser && (
                            <Badge className='ml-2 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 text-xs'>
                              YOU
                            </Badge>
                          )}
                        </p>
                        <p className='text-slate-400 text-sm'>
                          {user.exp.toLocaleString()} EXP
                        </p>
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <Trophy
                        className={`h-5 w-5 ${
                          user.rank === 1
                            ? 'text-yellow-400'
                            : user.rank === 2
                            ? 'text-gray-300'
                            : 'text-amber-600'
                        }`}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <div className='mt-8 text-center'>
        <Button className='bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 px-8 py-3'>
          <Zap className='h-4 w-4 mr-2' />
          Log Workout to Climb!
        </Button>
      </div>
    </div>
  )
}
