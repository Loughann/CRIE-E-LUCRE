"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Palette, MessageSquare, Check } from "lucide-react"

interface SimulationStep1Props {
  onComplete: () => void
}

export function SimulationStep1({ onComplete }: SimulationStep1Props) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  const services = [
    {
      id: "landing-page",
      name: "Página de Vendas",
      description: "Crie uma página de vendas persuasiva para produtos ou serviços",
      icon: <FileText className="h-8 w-8" />,
      earnings: "R$ 500",
      color: "from-blue-600 to-blue-800",
    },
    {
      id: "design",
      name: "Design com IA",
      description: "Gere designs, logos e banners para redes sociais",
      icon: <Palette className="h-8 w-8" />,
      earnings: "R$ 300",
      color: "from-purple-600 to-purple-800",
    },
    {
      id: "script",
      name: "Script de Atendimento",
      description: "Crie scripts persuasivos para atendimento e vendas",
      icon: <MessageSquare className="h-8 w-8" />,
      earnings: "R$ 400",
      color: "from-green-600 to-green-800",
    },
  ]

  const handleSelect = (serviceName: string) => {
    setIsSelecting(true)
    setSelectedService(serviceName)

    // Store the selected service
    localStorage.setItem("selectedService", serviceName)

    // Simulate selection process
    setTimeout(() => {
      setIsSelecting(false)
      onComplete()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2">ESCOLHA UM SERVIÇO</h2>
        <p className="text-green-300/70 font-mono">Selecione o tipo de serviço que você deseja criar com ChatGPT</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`bg-gray-900 border ${selectedService === service.name ? "border-green-500" : "border-green-500/30"} hover:border-green-500/70 transition-all duration-300 overflow-hidden cursor-pointer ${selectedService && selectedService !== service.name ? "opacity-50" : ""}`}
            onClick={() => !selectedService && !isSelecting && handleSelect(service.name)}
          >
            <div
              className={`p-6 bg-gradient-to-br ${service.color} flex flex-col items-center justify-center text-white relative`}
            >
              {selectedService === service.name && (
                <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-black" />
                </div>
              )}
              {service.icon}
              <h3 className="mt-4 text-xl font-bold font-mono">{service.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-green-300/80 font-mono text-sm mb-4">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 font-mono text-sm">Ganhos por entrega:</span>
                <span className="text-green-400 font-mono font-bold">{service.earnings}</span>
              </div>
              <Button
                onClick={() => !selectedService && !isSelecting && handleSelect(service.name)}
                className={`w-full ${
                  selectedService === service.name
                    ? "bg-green-600 text-black"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black"
                } font-mono`}
                disabled={!!selectedService || isSelecting}
              >
                {isSelecting && selectedService === service.name ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Selecionando</span>
                    <span className="inline-block ml-1 animate-pulse">.</span>
                    <span className="inline-block ml-0 animate-pulse delay-100">.</span>
                    <span className="inline-block ml-0 animate-pulse delay-200">.</span>
                  </span>
                ) : selectedService === service.name ? (
                  "SERVIÇO SELECIONADO"
                ) : (
                  "SELECIONAR SERVIÇO"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
