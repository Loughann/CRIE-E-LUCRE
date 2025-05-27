"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Send, User, Star, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface SimulationStep3Props {
  onComplete: () => void
}

export function SimulationStep3({ onComplete }: SimulationStep3Props) {
  const [isDelivering, setIsDelivering] = useState(false)
  const [isDelivered, setIsDelivered] = useState(false)
  const [clientFeedback, setClientFeedback] = useState("")
  const [selectedService, setSelectedService] = useState("Página de Vendas")

  // Get the selected service from localStorage
  useEffect(() => {
    const service = localStorage.getItem("selectedService")
    if (service) {
      setSelectedService(service)
    }
  }, [])

  const getServiceAmount = () => {
    switch (selectedService) {
      case "Página de Vendas":
        return 500
      case "Design com IA":
        return 300
      case "Script de Atendimento":
        return 400
      default:
        return 350
    }
  }

  const getClientName = () => {
    const clients = ["Carlos Mendes", "Ana Oliveira", "Roberto Santos", "Juliana Costa", "Marcelo Almeida"]
    return clients[Math.floor(Math.random() * clients.length)]
  }

  const getClientCompany = () => {
    const companies = ["TechSolutions", "Inova Marketing", "Empreenda Já", "Saúde Total", "Constrular"]
    return companies[Math.floor(Math.random() * companies.length)]
  }

  const clientName = getClientName()
  const clientCompany = getClientCompany()

  const handleDeliver = () => {
    setIsDelivering(true)

    // Store the amount earned
    localStorage.setItem("amountEarned", getServiceAmount().toString())

    // Simulate delivery process
    setTimeout(() => {
      setIsDelivering(false)
      setIsDelivered(true)

      // Generate client feedback
      const feedbacks = [
        `Excelente trabalho! Era exatamente o que eu precisava para minha empresa. Vou recomendar seus serviços.`,
        `Muito bom! Você entendeu perfeitamente o que eu queria. Já estou vendo resultados positivos.`,
        `Adorei o resultado! Ficou melhor do que eu esperava. Com certeza vou solicitar mais serviços.`,
        `Trabalho de qualidade e entregue no prazo. Parabéns pela eficiência e profissionalismo.`,
      ]
      const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)]
      setClientFeedback(feedback)

      // Store the feedback
      localStorage.setItem("clientFeedback", feedback)

      // After 2 seconds, complete the delivery
      setTimeout(() => {
        onComplete()
      }, 2000)
    }, 2000)
  }

  // Get the appropriate image based on the service
  const getServiceImage = () => {
    switch (selectedService) {
      case "Página de Vendas":
        return "/placeholder.svg?height=600&width=800&text=Página+de+Vendas+Gerada"
      case "Design com IA":
        return "/placeholder.svg?height=600&width=800&text=Design+Logo+TechFusion"
      case "Script de Atendimento":
        return "/placeholder.svg?height=600&width=800&text=Script+de+Atendimento+Gerado"
      default:
        return "/placeholder.svg?height=600&width=800&text=Conteúdo+Gerado"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2">REVISAR E ENTREGAR</h2>
        <p className="text-green-300/70 font-mono">
          Revise seu <span className="text-green-400">{selectedService}</span> antes de entregar ao cliente
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border border-green-500/30 overflow-hidden">
            <div className="bg-gray-950 p-4 border-b border-green-500/30">
              <h3 className="text-green-400 font-mono">Conteúdo Gerado</h3>
            </div>
            <div className="p-4">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="bg-gray-800 border border-green-500/20">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400"
                  >
                    Visualização
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-green-900/30 data-[state=active]:text-green-400"
                  >
                    Código
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-white text-gray-900 p-6 rounded-md">
                    <div className="relative w-full aspect-[4/3] mx-auto">
                      <Image
                        src={getServiceImage() || "/placeholder.svg"}
                        alt={`${selectedService} gerado`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-green-300 font-mono text-sm">
                    {selectedService === "Página de Vendas"
                      ? `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Domine o Marketing Digital</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="hero">
    <h1>DOMINE O MARKETING DIGITAL</h1>
    <h2>Transforme suas Redes Sociais em Máquinas de Vendas</h2>
    <p>Você está cansado de postar nas redes sociais sem ver resultados?</p>
    <button class="cta-button">QUERO AUMENTAR MINHAS VENDAS AGORA</button>
  </header>
  
  <section class="benefits">
    <h3>O QUE VOCÊ VAI APRENDER:</h3>
    <ul>
      <li>Como criar conteúdo que converte seguidores em clientes</li>
      <li>Estratégias avançadas de targeting para encontrar seu público ideal</li>
      <li>Técnicas de copywriting que aumentam suas vendas em até 300%</li>
      <li>Como automatizar seu marketing digital e economizar horas por semana</li>
    </ul>
  </section>
  
  <!-- Código completo omitido para brevidade -->
</body>
</html>`
                      : selectedService === "Design com IA"
                        ? `// Instruções para Logo da TechFusion

// Prompt para Midjourney:
"Minimalist tech logo for TechFusion company, overlapping hexagons, 
blue and green gradient, clean lines, white background, professional, 
vector style"

// Cores:
const colors = {
  primary: "#2563EB",    // Azul tecnológico
  secondary: "#10B981",  // Verde vibrante
  background: "#FFFFFF"  // Fundo branco
};

// Fontes:
const fonts = {
  primary: "Montserrat, sans-serif",
  alternative: "Poppins, sans-serif"
};

// Variações a serem criadas:
const variations = [
  "logo-horizontal.svg",
  "logo-vertical.svg",
  "logo-symbol.svg",
  "logo-monochrome.svg"
];

// Código SVG para o símbolo principal:
const svgCode = \`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#2563EB" />
      <stop offset="100%" stopColor="#10B981" />
    </linearGradient>
  </defs>
  <polygon points="..." fill="url(#gradient)" />
  <!-- Código SVG completo omitido para brevidade -->
</svg>
\`;`
                        : `// SCRIPT DE ATENDIMENTO - CONSULTORIA FINANCEIRA

const script = {
  abertura: \`Olá [Nome do Cliente], tudo bem? Aqui é [Seu Nome] da Consultoria 
  Financeira Prosperar. Agradeço pelo seu interesse em nossos serviços! 
  Estou entrando em contato porque você solicitou informações sobre como 
  organizar suas finanças pessoais. Teria alguns minutos para conversarmos 
  sobre como podemos te ajudar?\`,
  
  identificacaoNecessidades: [
    "Atualmente, qual é sua maior dificuldade em relação às suas finanças pessoais?",
    "Você já tentou alguma estratégia para resolver essa situação?",
    "Em uma escala de 0 a 10, quão urgente é resolver esse problema para você?",
    "Quais são seus principais objetivos financeiros para os próximos 12 meses?"
  ],
  
  apresentacaoSolucao: \`Baseado no que você me contou, temos exatamente o que 
  você precisa. Nossa consultoria financeira personalizada já ajudou mais de 
  500 clientes a [benefício principal relacionado à necessidade do cliente].\`,
  
  etapasProcesso: [
    "Diagnóstico Financeiro: Analisamos detalhadamente sua situação atual",
    "Plano Personalizado: Desenvolvemos estratégias específicas para seus objetivos",
    "Acompanhamento Contínuo: Monitoramos seus resultados e fazemos ajustes quando necessário"
  ],
  
  // Código completo omitido para brevidade
};`}
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </div>

        <div>
          <Card className="bg-gray-900 border border-green-500/30 overflow-hidden">
            <div className="bg-gray-950 p-4 border-b border-green-500/30">
              <h3 className="text-green-400 font-mono">Detalhes do Cliente</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-10 w-10 text-green-400 bg-green-900/30 p-2 rounded-full mr-3" />
                  <div>
                    <p className="text-green-400 font-mono font-bold">{clientName}</p>
                    <p className="text-green-300/70 font-mono text-sm">{clientCompany}</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-green-400 mr-2" />
                    <p className="text-green-300/70 font-mono text-sm">Prazo de entrega: Hoje</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <p className="text-green-300/70 font-mono text-sm">Cliente Premium</p>
                  </div>
                </div>

                <div className="bg-green-900/20 p-3 rounded-md border border-green-500/30">
                  <p className="text-green-400 font-mono text-sm mb-2">Valor do serviço:</p>
                  <p className="text-green-400 font-mono text-2xl font-bold">R$ {getServiceAmount()}</p>
                </div>

                {isDelivered ? (
                  <div className="bg-green-900/30 p-4 rounded-md border border-green-500/50">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      <p className="text-green-400 font-mono">Entrega concluída!</p>
                    </div>
                    <div className="mt-3 bg-gray-800/50 p-3 rounded-md">
                      <p className="text-green-300 font-mono text-sm italic">"{clientFeedback}"</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={handleDeliver}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black font-mono"
                    disabled={isDelivering}
                  >
                    {isDelivering ? (
                      <span className="flex items-center">
                        <span className="animate-pulse">Enviando</span>
                        <span className="inline-block ml-1 animate-pulse">.</span>
                        <span className="inline-block ml-0 animate-pulse delay-100">.</span>
                        <span className="inline-block ml-0 animate-pulse delay-200">.</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        ENTREGAR PARA O CLIENTE
                      </span>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
