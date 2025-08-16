"use client"

import { useEffect, useRef, useState } from "react"

interface SpriteConfig {
  key: string
  url: string
  frameWidth: number
  frameHeight: number
  totalFrames: number
  framesPerRow: number
}

interface AnimationConfig {
  key: string
  frames: number[]
  frameRate: number
  repeat: boolean
}

class Sprite {
  x: number
  y: number
  width: number
  height: number
  currentFrame: number
  animations: Map<string, AnimationConfig>
  currentAnimation: string | null
  animationTimer: number
  lastFrameTime: number
  scale: number
  flipX: boolean

  constructor(x: number, y: number, width: number, height: number, scale = 1) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.currentFrame = 0
    this.animations = new Map()
    this.currentAnimation = null
    this.animationTimer = 0
    this.lastFrameTime = 0
    this.scale = scale
    this.flipX = false
  }

  addAnimation(config: AnimationConfig) {
    this.animations.set(config.key, config)
  }

  play(animationKey: string) {
    if (this.animations.has(animationKey)) {
      this.currentAnimation = animationKey
      this.currentFrame = 0
      this.animationTimer = 0
    }
  }

  update(deltaTime: number) {
    if (!this.currentAnimation) return

    const animation = this.animations.get(this.currentAnimation)
    if (!animation) return

    this.animationTimer += deltaTime
    const frameTime = 1000 / animation.frameRate

    if (this.animationTimer >= frameTime) {
      this.currentFrame++
      if (this.currentFrame >= animation.frames.length) {
        if (animation.repeat) {
          this.currentFrame = 0
        } else {
          this.currentFrame = animation.frames.length - 1
        }
      }
      this.animationTimer = 0
    }
  }

  getCurrentFrameIndex(): number {
    if (!this.currentAnimation) return 0
    const animation = this.animations.get(this.currentAnimation)
    if (!animation) return 0
    return animation.frames[this.currentFrame] || 0
  }
}

interface FitnessSpriteProps {
  size?: number
  animationState?: "idle" | "active" | "celebrating"
  className?: string
}

export default function FitnessSprite({ size = 8, animationState = "idle", className = "" }: FitnessSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>()
  const animationRef = useRef<number>()
  const spriteRef = useRef<Sprite>()
  const lastTimeRef = useRef<number>(0)

  const [imageLoaded, setImageLoaded] = useState(false)

  // Sprite configuration
  const spriteConfig: SpriteConfig = {
    key: "fitness-character",
    url: "/cat1.png",
    frameWidth: 8,
    frameHeight: 8,
    totalFrames: 4,
    framesPerRow: 4,
  }

  // Load spritesheet
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      imageRef.current = img
      setImageLoaded(true)

      // Create sprite centered in canvas
      const sprite = new Sprite(
        (size - 16 * (size / 32)) / 2, // Center horizontally
        (size - 16 * (size / 32)) / 2, // Center vertically
        spriteConfig.frameWidth,
        spriteConfig.frameHeight,
        (size / 96) * 6, // Scale based on size
      )

      // Add animations
      sprite.addAnimation({
        key: "idle",
        frames: [0, 1],
        frameRate: 2,
        repeat: true,
      })

      sprite.addAnimation({
        key: "active",
        frames: [0, 1, 2, 3],
        frameRate: 6,
        repeat: true,
      })

      sprite.addAnimation({
        key: "celebrating",
        frames: [2, 3, 2, 3],
        frameRate: 8,
        repeat: true,
      })

      // Start with idle animation
      sprite.play(animationState)
      spriteRef.current = sprite
    }

    img.src = spriteConfig.url
  }, [size, animationState])

  // Animation state change
  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.play(animationState)
    }
  }, [animationState])

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageRef.current || !imageLoaded || !spriteRef.current) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size
    ctx.imageSmoothingEnabled = false

    const gameLoop = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update sprite
      spriteRef.current!.update(deltaTime)

      // Render sprite
      const sprite = spriteRef.current!
      const frameIndex = sprite.getCurrentFrameIndex()

      // Calculate source position in spritesheet
      const frameX = (frameIndex % spriteConfig.framesPerRow) * spriteConfig.frameWidth
      const frameY = Math.floor(frameIndex / spriteConfig.framesPerRow) * spriteConfig.frameHeight

      // Draw sprite
      ctx.drawImage(
        imageRef.current!,
        frameX,
        frameY,
        spriteConfig.frameWidth,
        spriteConfig.frameHeight,
        sprite.x,
        sprite.y,
        sprite.width * sprite.scale,
        sprite.height * sprite.scale,
      )

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [imageLoaded, size])

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        width: size,
        height: size,
      }}
    />
  )
}
