"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Terminal, Code, Cpu, Star, CheckCircle, ArrowRight, AlertTriangle, Gift, Zap, DollarSign, Lock } from "lucide-react"
import Image from "next/image"

export default function OfertaPage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [earnings, setEarnings] = useState(0)
  const [remainingSpots, setRemainingSpots] = useState(7)

  useEffect(() => {
    // Check if user has started the game
    const name = localStorage.getItem("playerName")
    const storedEarnings = localStorage.getItem("playerEarnings")

    if (!name) {
      router.push("/")
      return
    }

    setPlayerName(name)
    setEarnings(storedEarnings ? Number.parseInt(storedEarnings) : 0)
    setIsLoaded(true)

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate decreasing spots
    const spotTimer = setInterval(() => {
      if (Math.random() > 0.7 && remainingSpots > 1) {
        setRemainingSpots((prev) => prev - 1)
      }
    }, 45000) // Random spot decrease every ~45 seconds

    return () => {
      clearInterval(timer)
      clearInterval(spotTimer)
    }
  }, [router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500 rounded-full mb-4"></div>
          <p className="text-green-500 font-mono animate-pulse">Carregando sistema...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 relative">
      {/* Animated background code effect */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <pre className="text-xs text-green-500 animate-scroll whitespace-pre-wrap">
          {Array(50)
            .fill(
              "function generateAIIncome() { return prompt.execute(); }\nconst income = new PassiveIncome('AI');\nconst result = income.generate(500);\nif (result.success) { client.pay(500); }\n",
            )
            .join("")}
        </pre>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 mb-2">
            <Terminal className="h-6 w-6 text-green-400" />
            <h1 className="text-3xl font-bold text-green-400 font-mono">ACESSO_CONCEDIDO</h1>
          </div>
          <p className="text-green-300 text-lg font-mono">Usuário: {playerName} - Oferta Especial Desbloqueada</p>

          <div className="mt-4 inline-flex items-center bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-2 rounded-md font-mono">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-mono font-bold">Tempo restante: {formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Main Offer Card */}
        <Card className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-green-500/30 mb-8">
          <div className="bg-gradient-to-r from-green-900 to-green-800 p-6 text-center border-b border-green-500/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Cpu className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-green-400 font-mono">IMPÉRIO_DIGITAL.exe</h2>
            </div>
            <p className="text-green-300 mt-2 font-mono">
              Sistema completo para criar sites e landing pages com IA e cobrar até R$ 5.000 por projeto
            </p>
          </div>

          <div className="p-6">
            {/* Earnings Alert */}
            <div className="mb-8 bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-lg">
              <div className="text-yellow-400 font-mono text-center">
                <strong>🎯 VOCÊ ACABOU DE PROVAR QUE FUNCIONA!</strong>
                <br />
                <span className="text-xl mt-2 block">
                  Ganhou R$ {earnings} em apenas uma simulação.
                  <br />
                  Imagine fazendo isso todos os dias...
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Features */}
              <div>
                <h3 className="text-green-400 font-mono font-bold text-xl mb-4">O QUE VOCÊ VAI RECEBER:</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-300 font-mono font-bold">Curso Completo em Vídeo</h4>
                      <p className="text-green-300/70 font-mono text-sm">4 horas de conteúdo prático e direto ao ponto</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-300 font-mono font-bold">100+ Prompts Prontos</h4>
                      <p className="text-green-300/70 font-mono text-sm">Copie e cole para criar sites profissionais em minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-300 font-mono font-bold">Templates Premium</h4>
                      <p className="text-green-300/70 font-mono text-sm">20 modelos de sites que vendem por R$ 2.000 a R$ 5.000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-300 font-mono font-bold">Scripts de Vendas</h4>
                      <p className="text-green-300/70 font-mono text-sm">Exatamente o que falar para fechar clientes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-green-300 font-mono font-bold">Grupo VIP no Telegram</h4>
                      <p className="text-green-300/70 font-mono text-sm">Suporte direto comigo + networking com alunos</p>
                    </div>
                  </div>
                </div>

                {/* Bonus Section */}
                <div className="mt-8">
                  <div className="bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-lg">
                    <h4 className="text-yellow-400 font-mono font-bold text-lg mb-3">🎁 BÔNUS EXCLUSIVOS:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-yellow-300 font-mono text-sm">
                        <Gift className="h-4 w-4 mr-2 text-yellow-400" />
                        Prompt secreto que gera R$ 500+ por projeto
                      </li>
                      <li className="flex items-center text-yellow-300 font-mono text-sm">
                        <Gift className="h-4 w-4 mr-2 text-yellow-400" />
                        Lista de 50 clientes que pagam R$ 2.000+
                      </li>
                      <li className="flex items-center text-yellow-300 font-mono text-sm">
                        <Gift className="h-4 w-4 mr-2 text-yellow-400" />
                        Mentoria particular de 1 hora (Valor: R$ 500)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & CTA */}
              <div>
                <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                  {/* Timer & Scarcity */}
                  <div className="text-center mb-6">
                    <div className="bg-red-900/30 border border-red-500/50 p-3 rounded-lg mb-4">
                      <h3 className="text-red-400 font-mono font-bold">⚠️ ATENÇÃO: OFERTA LIMITADA</h3>
                      <p className="text-red-300/80 font-mono text-sm mt-1">
                        Apenas {remainingSpots} vagas com este preço especial
                      </p>
                    </div>

                    <div className="text-4xl font-bold mb-2">
                      <span className="text-gray-400 line-through text-2xl">R$ 1.497</span>
                      <br />
                      <span className="text-green-400">R$ 97</span>
                    </div>
                    <p className="text-green-300/70 font-mono">12x de R$ 9,70 sem juros</p>
                  </div>

                  {/* Security Badges */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                      <Lock className="h-5 w-5 text-green-400 mx-auto mb-2" />
                      <p className="text-green-300 font-mono text-xs">Pagamento Seguro</p>
                    </div>
                    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
                      <Shield className="h-5 w-5 text-green-400 mx-auto mb-2" />
                      <p className="text-green-300 font-mono text-xs">Garantia de 30 dias</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black font-bold py-6 text-xl font-mono relative overflow-hidden group"
                    onClick={() => window.open("https://pay.hotmart.com/exemplo", "_blank")}
                  >
                    <span className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></span>
                    <span className="relative flex items-center justify-center">
                      GARANTIR MINHA VAGA AGORA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </Button>

                  {/* Trust Elements */}
                  <div className="mt-4 text-center space-y-2">
                    <p className="text-green-300/70 font-mono text-sm flex items-center justify-center">
                      <Lock className="h-4 w-4 mr-1" />
                      Acesso imediato após confirmação
                    </p>
                    <p className="text-green-300/70 font-mono text-sm flex items-center justify-center">
                      <Shield className="h-4 w-4 mr-1" />
                      7 dias de garantia incondicional
                    </p>
                  </div>
                </div>

                {/* Urgency Banner */}
                <div className="mt-6 bg-red-900/30 border border-red-500/50 p-4 rounded-lg text-center">
                  <p className="text-red-400 font-mono text-sm font-bold">
                    ⚠️ Esta oferta expira em {formatTime(timeLeft)}
                    <br />
                    Após este tempo, o preço volta para R$ 1.497
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Social Proof Section */}
        <div className="mt-12 bg-gray-900 rounded-xl p-8 border border-green-500/30">
          <h3 className="text-center text-2xl font-bold text-green-400 font-mono mb-8">ALUNOS QUE JÁ ESTÃO LUCRANDO</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Carlos Silva",
                earnings: "R$ 3.750",
                text: "Fiz 3 sites em 2 semanas usando IA. Cobrei R$ 1.250 cada. Nunca foi tão fácil ganhar dinheiro!",
              },
              {
                name: "Ana Oliveira",
                earnings: "R$ 2.997",
                text: "O método é incrível! Em 1 mês já recuperei o investimento várias vezes. Os clientes adoram!",
              },
              {
                name: "Roberto Santos",
                earnings: "R$ 5.000",
                text: "Fechei um projeto por R$ 5.000 usando os templates do curso. O cliente ficou impressionado!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-green-500/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-black font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-green-400 font-mono font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {Array(5).fill(null).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-green-300/70 font-mono text-sm mb-4">"{testimonial.text}"</p>
                <div className="bg-green-900/30 p-3 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 font-mono text-sm">Faturamento:</span>
                    <span className="text-green-400 font-mono font-bold">{testimonial.earnings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <Button
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black font-bold py-6 px-12 text-xl font-mono inline-flex items-center"
            onClick={() => window.open("https://pay.hotmart.com/exemplo", "_blank")}
          >
            QUERO COMEÇAR AGORA
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-green-300/70 font-mono text-sm">
            Apenas {remainingSpots} vagas restantes com este preço especial
          </p>
        </div>
      </div>
    </div>
  )
}