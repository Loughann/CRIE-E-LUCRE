"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import confetti from "canvas-confetti"

interface SimulationStep4Props {
  onComplete: () => void
}

export function SimulationStep4({ onComplete }: SimulationStep4Props) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedService, setSelectedService] = useState("Página de Vendas")
  const [amount, setAmount] = useState(500)
  const [clientFeedback, setClientFeedback] = useState("")

  useEffect(() => {
    // Get data from localStorage
    const service = localStorage.getItem("selectedService")
    const amountEarned = localStorage.getItem("amountEarned")
    const feedback = localStorage.getItem("clientFeedback")

    if (service) {
      setSelectedService(service)
    }

    if (amountEarned) {
      setAmount(Number.parseInt(amountEarned))
    }

    if (feedback) {
      setClientFeedback(feedback)
    }

    // Trigger confetti effect when component mounts
    setShowConfetti(true)

    if (typeof window !== "undefined") {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)

        // Since particles fall down, start a bit higher than random
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        )
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        )
      }, 250)
    }

    // Mark as complete after confetti
    setTimeout(() => {
      onComplete()
    }, 1000)
  }, [onComplete])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2">PAGAMENTO RECEBIDO!</h2>
        <p className="text-green-300/70 font-mono">
          Seu <span className="text-green-400">{selectedService}</span> foi entregue com sucesso
        </p>
      </div>

      <Card className="bg-gray-900 border border-green-500/50 overflow-hidden max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-center">
          <div className="bg-white/10 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-white font-mono text-xl font-bold">Transação Concluída</h3>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-green-500/20">
              <span className="text-green-300/70 font-mono">Serviço:</span>
              <span className="text-green-400 font-mono font-bold">{selectedService}</span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-green-500/20">
              <span className="text-green-300/70 font-mono">Status:</span>
              <span className="text-green-400 font-mono font-bold flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> Pago
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-green-500/20">
              <span className="text-green-300/70 font-mono">Data:</span>
              <span className="text-green-400 font-mono font-bold">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between items-center pb-4">
              <span className="text-green-300/70 font-mono">Valor:</span>
              <span className="text-green-400 font-mono text-2xl font-bold">R$ {amount}</span>
            </div>

            <div className="bg-green-900/20 p-4 rounded-md border border-green-500/30 mt-6">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <p className="text-green-400 font-mono">Feedback do cliente:</p>
              </div>
              <p className="text-green-300 font-mono text-sm italic">"{clientFeedback}"</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
