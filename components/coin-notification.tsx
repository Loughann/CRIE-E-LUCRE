"use client"

import { useState, useEffect } from "react"
import { Coins } from "lucide-react"

interface CoinNotificationProps {
  amount: number
  onComplete?: () => void
  trigger?: boolean
}

export function CoinNotification({ amount, onComplete, trigger }: CoinNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {/* Mobile-optimized notification */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-auto sm:max-w-sm">
          <div
            className={`
            transform transition-all duration-500 ease-out
            ${isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-full opacity-0 scale-95"}
            bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
            text-white rounded-2xl shadow-2xl
            p-4 sm:p-5
            border border-yellow-300/30
            backdrop-blur-sm
            pointer-events-auto
            touch-manipulation
            select-none
          `}
          >
            {/* Content container */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Icon container */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-bounce" />
                  </div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base sm:text-lg leading-tight">+{amount} Moedas!</div>
                <div className="text-yellow-100 text-sm sm:text-base opacity-90 leading-tight mt-1">
                  Parabéns! Continue assim!
                </div>
              </div>

              {/* Amount badge */}
              <div className="flex-shrink-0">
                <div className="bg-white/20 rounded-full px-3 py-1 sm:px-4 sm:py-2">
                  <span className="font-bold text-sm sm:text-base">{amount}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 sm:mt-4">
              <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
                <div
                  className="bg-white rounded-full h-full transition-all duration-3000 ease-out"
                  style={{
                    width: isVisible ? "100%" : "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating coins animation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-6 h-6 sm:w-8 sm:h-8 text-yellow-400
                ${isVisible ? "animate-bounce" : "opacity-0"}
              `}
              style={{
                left: `${(i - 2) * 40}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            >
              <Coins className="w-full h-full drop-shadow-lg" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
