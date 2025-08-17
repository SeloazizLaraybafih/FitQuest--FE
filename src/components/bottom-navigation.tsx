"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Trophy, User, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Hub",
    href: "/",
    icon: Home,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Log",
    href: "/log-workout",
    icon: Plus,
    isSpecial: true,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism background */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            if (item.isSpecial) {
              return (
                <Button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-6 w-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse" />
                </Button>
              )
            }

            return (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 h-auto min-h-[60px] hover:bg-white/10 transition-all duration-300",
                  isActive && "text-cyan-400",
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      isActive ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "text-slate-400",
                    )}
                  />
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isActive ? "text-cyan-400" : "text-slate-400",
                  )}
                >
                  {item.name}
                </span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
