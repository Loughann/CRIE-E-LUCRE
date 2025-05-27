"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Terminal, Code, Cpu, Star, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function OfertaPage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [earnings, setEarnings] = useState(0)

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

    return () => clearInterval(timer)
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
              "function hackAI() { return generateIncome(100); } // AI income generator\nconst prompt = new AIPrompt('Create landing page');\nconst result = ChatGPT.execute(prompt);\nif (result.quality > 0.8) { client.pay(500); }\n",
            )
            .join("")}
        </pre>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Terminal className="h-6 w-6 text-green-400" />
            <h1 className="text-3xl font-bold text-green-400 font-mono">ACESSO_CONCEDIDO</h1>
          </div>
          <p className="text-green-300 text-lg font-mono">Usuário: {playerName} - Oferta Especial Desbloqueada</p>

          <div className="mt-4 inline-flex items-center bg-red-900/50 border border-red-500/50 text-red-400 px-4 py-2 rounded-md font-mono">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-mono font-bold">Tempo restante: {formatTime(timeLeft)}</span>
          </div>
        </div>

        <Card className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-green-500/30">
          <div className="bg-gradient-to-r from-green-900 to-green-800 p-6 text-center border-b border-green-500/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Cpu className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-green-400 font-mono">IMPÉRIO_DIGITAL.exe</h2>
            </div>
            <p className="text-green-300 mt-2 font-mono">
              Sistema completo para criação de negócios digitais com ChatGPT
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="aspect-video relative rounded-lg overflow-hidden mb-4 border border-green-500/30">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Curso Renda Extra com IA"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <Code className="h-16 w-16 text-green-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-green-400 font-mono text-sm">4.9/5 (2,847 reviews)</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    <span className="font-mono text-sm">+50 prompts testados e aprovados</span>
                  </div>
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    <span className="font-mono text-sm">Estratégias de monetização comprovadas</span>
                  </div>
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    <span className="font-mono text-sm">Suporte técnico 24/7</span>
                  </div>
                  <div className="flex items-center text-green-300">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                    <span className="font-mono text-sm">Garantia de 30 dias</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <div className="bg-gray-800 p-6 rounded-lg border border-green-500/30">
                  <div className="text-center mb-6">
                    <div className="text-gray-400 line-through text-lg font-mono">De: R$ 497,00</div>
                    <div className="text-3xl font-bold text-green-400 font-mono">Por: R$ 97,00</div>
                    <div className="text-red-400 font-mono text-sm mt-1">Desconto de 80% - Apenas hoje!</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="text-green-400 font-mono font-bold text-lg">O que você vai receber:</h3>
                    <ul className="space-y-2 text-green-300 font-mono text-sm">
                      <li>• Curso completo em vídeo (4h de conteúdo)</li>
                      <li>• E-book com 100+ prompts prontos</li>
                      <li>• Templates de landing pages</li>
                      <li>• Scripts de vendas testados</li>
                      <li>• Grupo VIP no Telegram</li>
                      <li>• Bônus: Automação com ChatGPT</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-4 text-lg font-mono"
                      onClick={() => window.open("https://pay.hotmart.com/exemplo", "_blank")}
                    >
                      QUERO GARANTIR MINHA VAGA
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <div className="text-center">
                      <div className="text-green-400 font-mono text-xs">Pagamento 100% seguro</div>
                      <div className="text-green-400 font-mono text-xs">Acesso imediato após confirmação</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-900/30 border border-yellow-500/50 p-4 rounded-lg">
                  <div className="text-yellow-400 font-mono text-sm text-center">
                    <strong>ATENÇÃO:</strong> Você já ganhou R$ {earnings} na simulação!
                    <br />
                    Imagine o que pode fazer com o sistema completo...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-gray-900 border border-green-500/30 p-6 rounded-lg">
            <h3 className="text-green-400 font-mono font-bold text-xl mb-4">Depoimentos de Alunos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded border border-green-500/20">
                <p className="text-green-300 font-mono text-sm mb-2">
                  "Em 30 dias já recuperei o investimento. Agora ganho mais de R$ 3.000/mês!"
                </p>
                <div className="text-green-400 font-mono text-xs">- Maria S., Designer</div>
              </div>
              <div className="bg-gray-800 p-4 rounded border border-green-500/20">
                <p className="text-green-300 font-mono text-sm mb-2">
                  "O sistema é incrível! Automatizei tudo e trabalho apenas 2h por dia."
                </p>
                <div className="text-green-400 font-mono text-xs">- João P., Programador</div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Revelação e CTA Final */}
        <div className="mt-12 bg-gradient-to-r from-red-900 to-red-800 border-2 border-red-500 p-8 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-red-400 font-mono mb-4 animate-pulse">🚨 REVELAÇÃO CHOCANTE 🚨</h2>
              <div className="bg-black/50 p-6 rounded border border-red-500/50 mb-6">
                <p className="text-red-300 font-mono text-lg leading-relaxed">
                  <strong className="text-red-400">TUDO O QUE VOCÊ ACABOU DE VIVENCIAR FOI CRIADO POR IA!</strong>
                  <br />
                  <br />• O chat que te atendeu? <span className="text-red-400">ChatGPT</span>
                  <br />• A simulação de atendimento? <span className="text-red-400">IA</span>
                  <br />• Esta página de vendas? <span className="text-red-400">IA</span>
                  <br />• Todo o design e navegação? <span className="text-red-400">IA</span>
                  <br />• Os textos persuasivos? <span className="text-red-400">IA</span>
                </p>
              </div>
            </div>

            <div className="bg-yellow-900/30 border-2 border-yellow-500 p-6 rounded-lg mb-6">
              <h3 className="text-yellow-400 font-mono font-bold text-2xl mb-4 text-center">
                E VOCÊ VAI APRENDER A FAZER EXATAMENTE ISSO!
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-yellow-300 font-mono">
                <div>
                  <h4 className="text-yellow-400 font-bold mb-2">SERVIÇOS QUE VOCÊ PODERÁ CRIAR:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Landing pages que convertem</li>
                    <li>• Chatbots de atendimento</li>
                    <li>• E-commerces completos</li>
                    <li>• Sistemas de agendamento</li>
                    <li>• Apps e sites personalizados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-bold mb-2">QUANTO VOCÊ PODE COBRAR:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Landing page: R$ 800 - R$ 3.000</li>
                    <li>• Chatbot: R$ 1.500 - R$ 5.000</li>
                    <li>• E-commerce: R$ 3.000 - R$ 15.000</li>
                    <li>• Sistema completo: R$ 10.000+</li>
                    <li>• Consultoria IA: R$ 200/hora</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black border-2 border-green-500 p-6 rounded-lg mb-6">
              <div className="text-center">
                <h3 className="text-green-400 font-mono font-bold text-3xl mb-4">
                  ÚLTIMA CHANCE - OFERTA EXPIRA EM {formatTime(timeLeft)}
                </h3>
                <div className="text-red-400 font-mono text-xl mb-4">
                  ⚠️ APENAS {Math.floor(Math.random() * 8) + 3} VAGAS RESTANTES ⚠️
                </div>

                <div className="bg-green-900/30 border border-green-500/50 p-4 rounded mb-4">
                  <h4 className="text-green-400 font-bold text-xl mb-2">🎁 BÔNUS EXCLUSIVO SE COMPRAR AGORA:</h4>
                  <div className="text-green-300 font-mono text-sm space-y-1">
                    <p>• Acesso ao meu prompt secreto que gera R$ 500+ por projeto</p>
                    <p>• Lista de 50 clientes que pagam R$ 2.000+ por landing page</p>
                    <p>• Template pronto para cobrar R$ 5.000 por chatbot</p>
                    <p>• Mentoria particular de 1 hora comigo (Valor: R$ 500)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-gray-400 line-through text-2xl font-mono">R$ 1.497,00</div>
                    <div className="text-5xl font-bold text-green-400 font-mono">R$ 97,00</div>
                    <div className="text-red-400 font-mono text-lg">12x de R$ 9,70 sem juros</div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-black font-bold py-6 text-2xl font-mono border-2 border-green-400 shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => window.open("https://pay.hotmart.com/exemplo", "_blank")}
                  >
                    🚀 SIM! QUERO DOMINAR A IA AGORA! 🚀
                  </Button>

                  <div className="text-center space-y-2">
                    <div className="text-green-400 font-mono text-sm">
                      ✅ Acesso imediato após confirmação do pagamento
                    </div>
                    <div className="text-green-400 font-mono text-sm">✅ Garantia incondicional de 30 dias</div>
                    <div className="text-green-400 font-mono text-sm">✅ Suporte prioritário 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-red-900/50 border border-red-500/50 p-4 rounded">
              <p className="text-red-300 font-mono text-lg font-bold">
                ⚠️ ATENÇÃO: Esta oferta NUNCA mais será repetida!
                <br />
                Depois que o timer zerar, o preço volta para R$ 1.497,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
