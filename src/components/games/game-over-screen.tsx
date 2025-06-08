"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type GameOverScreenProps = {
  score: number
  highScore: number
  onRestart: () => void
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const [canRestart, setCanRestart] = useState(false)
  const isNewHighScore = score === highScore && score > 0

  useEffect(() => {
    // Wait 2 seconds before allowing restart
    const timer = setTimeout(() => {
      setCanRestart(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRestart = () => {
    if (canRestart) {
      onRestart()
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-60">
      <Card className="bg-black p-6 text-center space-y-4 shadow-2xl border-4 border-red-600">
        <h2 className="text-3xl font-bold text-red-600">Game Over!</h2>

        <div className="space-y-2">
          <div className="text-xl">
            <span className="text-white">Score: </span>
            <span className="font-bold text-blue-600">{score}</span>
          </div>

          <div className="text-xl">
            <span className="text-white">Best: </span>
            <span className="font-bold text-red-600">{highScore}</span>
          </div>

          {isNewHighScore && (
            <div className="text-sm text-red-600 font-bold animate-pulse">🎉 New High Score! 🎉</div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleRestart}
            disabled={!canRestart}
            className={`font-bold px-6 py-2 rounded-full shadow-lg transform transition-all ${
              canRestart
                ? "bg-red-500 hover:bg-red-600 text-white hover:scale-105"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            {canRestart ? "Play Again" : "Wait..."}
          </Button>

          <div className="text-xs text-gray-500">
            {canRestart ? <p>Tap or press Space to fly again!</p> : <p>...</p>}
          </div>
        </div>
      </Card>
    </div>
  )
}
