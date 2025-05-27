"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Rocket } from "lucide-react"

interface StartFormProps {
  onSubmit: (name: string, whatsapp: string) => void
}

export function StartForm({ onSubmit }: StartFormProps) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não for dígito
    const numbers = value.replace(/\D/g, "")

    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11)

    // Aplica a formatação
    if (limited.length <= 2) {
      return limited
    } else if (limited.length <= 7) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name, whatsapp)
  }

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Comece Sua Jornada</h2>
        <p className="text-slate-400">Preencha seus dados para acessar a simulação</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome Completo */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-green-400 font-medium">
            Nome Completo
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-400 focus:ring-green-400/20"
              required
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-green-400 font-medium">
            WhatsApp
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                setWhatsapp(formatted)
              }}
              placeholder="(11) 99999-9999"
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-400 focus:ring-green-400/20"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Iniciar Simulação
        </Button>
      </form>

      {/* Privacy Notice */}
      <p className="text-center text-slate-400 text-sm mt-6">Seus dados estão seguros e não serão compartilhados</p>
    </div>
  )
}
