"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Zap, Save, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const workoutTypes = [
  { name: "Strength Training", icon: "💪", baseExp: 150, color: "from-red-500 to-orange-500" },
  { name: "Cardio Run", icon: "🏃‍♂️", baseExp: 120, color: "from-blue-500 to-cyan-500" },
  { name: "Yoga", icon: "🧘‍♂️", baseExp: 100, color: "from-green-500 to-emerald-500" },
  { name: "HIIT", icon: "⚡", baseExp: 180, color: "from-purple-500 to-pink-500" },
  { name: "Pilates", icon: "🤸‍♀️", baseExp: 110, color: "from-pink-500 to-rose-500" },
  { name: "CrossFit", icon: "🏋️‍♂️", baseExp: 170, color: "from-orange-500 to-red-500" },
]

export default function LogWorkout() {
  const router = useRouter()
  const [selectedWorkout, setSelectedWorkout] = useState<(typeof workoutTypes)[0] | null>(null)
  const [duration, setDuration] = useState("")
  const [intensity, setIntensity] = useState<"low" | "medium" | "high">("medium")
  const [notes, setNotes] = useState("")
  const [isLogging, setIsLogging] = useState(false)

  const calculateExp = () => {
    if (!selectedWorkout || !duration) return 0

    const durationNum = Number.parseInt(duration)
    const intensityMultiplier = { low: 0.8, medium: 1.0, high: 1.3 }[intensity]
    const durationMultiplier = Math.min(durationNum / 30, 2) // Cap at 2x for very long workouts

    return Math.round(selectedWorkout.baseExp * intensityMultiplier * durationMultiplier)
  }

  const handleLogWorkout = async () => {
    if (!selectedWorkout || !duration) return

    setIsLogging(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically save to your backend
    console.log({
      workout: selectedWorkout.name,
      duration: Number.parseInt(duration),
      intensity,
      notes,
      expEarned: calculateExp(),
    })

    setIsLogging(false)
    router.push("/") // Navigate back to hub
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pt-4">
        <Button size="icon" variant="ghost" className="text-white hover:bg-white/10" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="h-6 w-6 text-cyan-400" />
            Log Workout
          </h1>
          <p className="text-slate-400">Record your training session</p>
        </div>
      </div>

      {/* Workout Type Selection */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Choose Workout Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {workoutTypes.map((workout) => (
              <Button
                key={workout.name}
                variant="ghost"
                onClick={() => setSelectedWorkout(workout)}
                className={`h-20 flex flex-col gap-2 border-2 transition-all duration-300 ${
                  selectedWorkout?.name === workout.name
                    ? "border-cyan-400 bg-cyan-400/10 text-white"
                    : "border-white/20 hover:border-white/40 text-slate-300 hover:text-white"
                }`}
              >
                <span className="text-2xl">{workout.icon}</span>
                <span className="text-xs font-medium">{workout.name}</span>
                <Badge className="bg-white/20 text-white border-0 text-xs">{workout.baseExp} EXP</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Details */}
      {selectedWorkout && (
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <selectedWorkout.icon className="text-xl" />
              {selectedWorkout.name} Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Duration */}
            <div>
              <Label htmlFor="duration" className="text-white mb-2 block">
                Duration (minutes)
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>

            {/* Intensity */}
            <div>
              <Label className="text-white mb-2 block">Intensity Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "high"] as const).map((level) => (
                  <Button
                    key={level}
                    variant="ghost"
                    onClick={() => setIntensity(level)}
                    className={`border-2 transition-all duration-300 ${
                      intensity === level
                        ? "border-cyan-400 bg-cyan-400/10 text-white"
                        : "border-white/20 hover:border-white/40 text-slate-300 hover:text-white"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-white mb-2 block">
                Notes (optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="How did the workout feel? Any achievements?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 resize-none"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* EXP Preview */}
      {selectedWorkout && duration && (
        <Card className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-400/30 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">EXP Preview</p>
                  <p className="text-slate-300 text-sm">Based on your workout details</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-400">+{calculateExp()}</p>
                <p className="text-slate-300 text-sm">EXP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleLogWorkout}
        disabled={!selectedWorkout || !duration || isLogging}
        className="w-full h-14 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLogging ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Logging Workout...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Log Workout & Earn {calculateExp()} EXP
          </div>
        )}
      </Button>
    </div>
  )
}
