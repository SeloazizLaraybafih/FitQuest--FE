"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingBag, Coins, Zap, Shirt, Palette, Gift, Star, Check, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

// Shop items data
const avatarAccessories = [
  {
    id: 1,
    name: "Golden Crown",
    icon: "👑",
    price: 500,
    category: "head",
    rarity: "legendary",
    owned: false,
    description: "Show your royal status with this shimmering golden crown",
  },
  {
    id: 2,
    name: "Cool Sunglasses",
    icon: "🕶️",
    price: 150,
    category: "head",
    rarity: "common",
    owned: true,
    description: "Look cool during your workouts",
  },
  {
    id: 3,
    name: "Fitness Headband",
    icon: "🎽",
    price: 100,
    category: "head",
    rarity: "common",
    owned: false,
    description: "Perfect for intense workout sessions",
  },
  {
    id: 4,
    name: "Champion Belt",
    icon: "🏆",
    price: 300,
    category: "body",
    rarity: "rare",
    owned: false,
    description: "Earned by true fitness champions",
  },
  {
    id: 5,
    name: "Muscle Shirt",
    icon: "💪",
    price: 200,
    category: "body",
    rarity: "common",
    owned: false,
    description: "Show off those gains!",
  },
  {
    id: 6,
    name: "Neon Jacket",
    icon: "🧥",
    price: 400,
    category: "body",
    rarity: "epic",
    owned: false,
    description: "Glow in style with this futuristic jacket",
  },
  {
    id: 7,
    name: "Running Shoes",
    icon: "👟",
    price: 250,
    category: "feet",
    rarity: "rare",
    owned: true,
    description: "Boost your cardio performance",
  },
  {
    id: 8,
    name: "Power Gloves",
    icon: "🧤",
    price: 180,
    category: "hands",
    rarity: "common",
    owned: false,
    description: "Enhanced grip for strength training",
  },
]

const powerUps = [
  {
    id: 9,
    name: "2x EXP Boost",
    icon: "⚡",
    price: 100,
    duration: "1 hour",
    effect: "Double EXP gain",
    owned: 2,
    description: "Double your EXP gains for the next hour",
  },
  {
    id: 10,
    name: "Streak Shield",
    icon: "🛡️",
    price: 200,
    duration: "3 days",
    effect: "Protects streak",
    owned: 0,
    description: "Protects your streak if you miss a day",
  },
  {
    id: 11,
    name: "Coin Multiplier",
    icon: "💰",
    price: 150,
    duration: "2 hours",
    effect: "1.5x coin gain",
    owned: 1,
    description: "Earn 50% more coins from workouts",
  },
  {
    id: 12,
    name: "Energy Drink",
    icon: "🥤",
    price: 50,
    duration: "30 min",
    effect: "Faster recovery",
    owned: 5,
    description: "Reduces workout cooldown time",
  },
]

const themes = [
  {
    id: 13,
    name: "Cyber Neon",
    icon: "🌈",
    price: 800,
    preview: "from-cyan-500 to-purple-500",
    owned: false,
    description: "Futuristic neon theme with glowing effects",
  },
  {
    id: 14,
    name: "Forest Green",
    icon: "🌲",
    price: 600,
    preview: "from-green-500 to-emerald-500",
    owned: false,
    description: "Natural and calming forest theme",
  },
  {
    id: 15,
    name: "Sunset Orange",
    icon: "🌅",
    price: 700,
    preview: "from-orange-500 to-red-500",
    owned: false,
    description: "Warm sunset colors for motivation",
  },
  {
    id: 16,
    name: "Ocean Blue",
    icon: "🌊",
    price: 650,
    preview: "from-blue-500 to-teal-500",
    owned: true,
    description: "Cool and refreshing ocean theme",
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    case "rare":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "epic":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    case "legendary":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }
}

export default function ShopPage() {
  const router = useRouter()
  const [coins, setCoins] = useState(1250)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async (item: any) => {
    if (coins < item.price) return

    setIsPurchasing(true)

    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCoins((prev) => prev - item.price)

    // Update item ownership (in real app, this would be handled by backend)
    if (item.owned !== undefined) {
      if (typeof item.owned === "number") {
        item.owned += 1
      } else {
        item.owned = true
      }
    }

    setIsPurchasing(false)
    setSelectedItem(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-cyan-400" />
            Fitness Shop
          </h1>
          <p className="text-slate-400">Upgrade your avatar and boost your performance</p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-4 py-2">
          <Coins className="h-5 w-5 text-yellow-400" />
          <span className="text-white font-bold">{coins.toLocaleString()}</span>
        </div>
      </div>

      {/* Shop Tabs */}
      <Tabs defaultValue="accessories" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20 mb-6">
          <TabsTrigger value="accessories" className="data-[state=active]:bg-white/20 text-white">
            <Shirt className="h-4 w-4 mr-2" />
            Accessories
          </TabsTrigger>
          <TabsTrigger value="powerups" className="data-[state=active]:bg-white/20 text-white">
            <Zap className="h-4 w-4 mr-2" />
            Power-ups
          </TabsTrigger>
          <TabsTrigger value="themes" className="data-[state=active]:bg-white/20 text-white">
            <Palette className="h-4 w-4 mr-2" />
            Themes
          </TabsTrigger>
        </TabsList>

        {/* Avatar Accessories */}
        <TabsContent value="accessories">
          <div className="grid grid-cols-2 gap-4">
            {avatarAccessories.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${item.owned ? "ring-2 ring-green-400/50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2 relative">
                          {item.icon}
                          {item.owned && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-2">{item.name}</h3>
                        <Badge className={`mb-2 text-xs ${getRarityColor(item.rarity)}`}>{item.rarity}</Badge>
                        <div className="flex items-center justify-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-bold">{item.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      {item.name}
                      <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">{item.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Price:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-bold text-lg">{item.price}</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    {item.owned ? (
                      <Button disabled className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Check className="h-4 w-4 mr-2" />
                        Owned
                      </Button>
                    ) : coins < item.price ? (
                      <Button disabled className="bg-red-500/20 text-red-400 border-red-500/30">
                        <Lock className="h-4 w-4 mr-2" />
                        Insufficient Coins
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={isPurchasing}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0"
                      >
                        {isPurchasing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Purchasing...
                          </div>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>

        {/* Power-ups */}
        <TabsContent value="powerups">
          <div className="grid gap-4">
            {powerUps.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{item.icon}</div>
                          <div>
                            <h3 className="text-white font-semibold">{item.name}</h3>
                            <p className="text-slate-400 text-sm">
                              {item.effect} • {item.duration}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Coins className="h-4 w-4 text-yellow-400" />
                            <span className="text-white font-bold">{item.price}</span>
                          </div>
                          {item.owned > 0 && (
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                              Owned: {item.owned}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      {item.name}
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">{item.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Effect:</span>
                      <span className="text-white">{item.effect}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-white">{item.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Price:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-bold text-lg">{item.price}</span>
                      </div>
                    </div>
                    {item.owned > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Currently Owned:</span>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">{item.owned}</Badge>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    {coins < item.price ? (
                      <Button disabled className="bg-red-500/20 text-red-400 border-red-500/30">
                        <Lock className="h-4 w-4 mr-2" />
                        Insufficient Coins
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={isPurchasing}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0"
                      >
                        {isPurchasing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Purchasing...
                          </div>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>

        {/* Themes */}
        <TabsContent value="themes">
          <div className="grid grid-cols-2 gap-4">
            {themes.map((theme) => (
              <Dialog key={theme.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${theme.owned ? "ring-2 ring-green-400/50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${theme.preview} flex items-center justify-center text-2xl relative`}
                        >
                          {theme.icon}
                          {theme.owned && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-2">{theme.name}</h3>
                        <div className="flex items-center justify-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span className="text-white font-bold">{theme.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="bg-slate-900/95 backdrop-blur-md border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.preview} flex items-center justify-center`}
                      >
                        {theme.icon}
                      </div>
                      {theme.name}
                    </DialogTitle>
                    <DialogDescription className="text-slate-300">{theme.description}</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div
                      className={`w-full h-20 rounded-lg bg-gradient-to-r ${theme.preview} mb-4 flex items-center justify-center`}
                    >
                      <span className="text-white font-bold">Theme Preview</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Price:</span>
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-bold text-lg">{theme.price}</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    {theme.owned ? (
                      <Button disabled className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Check className="h-4 w-4 mr-2" />
                        Owned
                      </Button>
                    ) : coins < theme.price ? (
                      <Button disabled className="bg-red-500/20 text-red-400 border-red-500/30">
                        <Lock className="h-4 w-4 mr-2" />
                        Insufficient Coins
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(theme)}
                        disabled={isPurchasing}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0"
                      >
                        {isPurchasing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Purchasing...
                          </div>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Daily Deals Section */}
      <Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-pink-400/30 mt-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Gift className="h-5 w-5 text-pink-400" />
            Daily Deal
            <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30 animate-pulse">50% OFF</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="text-white font-semibold">Mega EXP Boost</h3>
                <p className="text-slate-300 text-sm">3x EXP gain for 2 hours</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-400 line-through">400</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-bold">200</span>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-0">
              <Star className="h-4 w-4 mr-2" />
              Grab Deal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
