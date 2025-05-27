"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { StartForm } from "@/components/start-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, AlertTriangle, Shield, Code, Gift } from "lucide-react"

export default function UsuarioPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showStartForm, setShowStartForm] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [exitPopupShown, setExitPopupShown] = useState(false)
  const [popupName, setPopupName] = useState("")
  const [popupWhatsapp, setPopupWhatsapp] = useState("")

  useEffect(() => {
    // Verifica se veio da página de venda
    const fromVenda = sessionStorage.getItem("fromVenda")
    if (!fromVenda) {
      router.push("/venda")
      return
    }
    setIsLoading(false)

    // Verifica se o usuário já preencheu o formulário
    const playerName = localStorage.getItem("playerName")
    if (playerName) {
      // Usuário já tem dados, vai para a próxima etapa
      router.push("/contratacao")
    } else {
      setTimeout(() => {
        setShowStartForm(true)
      }, 1000)
    }
  }, [router])

  useEffect(() => {
    if (!isLoading || exitPopupShown) return

    let scrollTimer: NodeJS.Timeout
    let lastScrollY = 0
    let scrollDirection = 0

    // Desktop: Detecção de mouse leave
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup) {
        setShowExitPopup(true)
        setExitPopupShown(true)
      }
    }

    // Mobile: Detecção de scroll up (simula gesto de voltar)
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        scrollDirection++
        if (scrollDirection > 3 && currentScrollY < 100 && !showExitPopup) {
          if (scrollTimer) clearTimeout(scrollTimer)
          scrollTimer = setTimeout(() => {
            setShowExitPopup(true)
            setExitPopupShown(true)
          }, 300)
        }
      } else {
        scrollDirection = 0
      }

      lastScrollY = currentScrollY
    }

    // Mobile: Eventos de touch para detecção de swipe
    let touchStartY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY
      const touchDiff = touchCurrentY - touchStartY
      const timeDiff = Date.now() - touchStartTime

      // Detecta swipe rápido para cima próximo ao topo da tela
      if (touchDiff > 50 && timeDiff < 300 && touchStartY < 100 && !showExitPopup) {
        setShowExitPopup(true)
        setExitPopupShown(true)
      }
    }

    // Keyboard: Tecla ESC
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !showExitPopup) {
        setShowExitPopup(true)
        setExitPopupShown(true)
      }
    }

    // Adiciona os event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: true })
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("keydown", handleKeyDown)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [isLoading, exitPopupShown, showExitPopup])

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!popupName.trim() || !popupWhatsapp.trim()) {
      alert("Por favor, preencha todos os campos")
      return
    }

    // Salva no localStorage
    localStorage.setItem("playerName", popupName.trim())
    localStorage.setItem("playerWhatsapp", popupWhatsapp.trim())

    // Fecha o popup e vai para a próxima etapa
    setShowExitPopup(false)
    router.push("/contratacao")
  }

  const handleClosePopup = () => {
    setShowExitPopup(false)
  }

  const handleSubmit = (name: string, whatsapp: string) => {
    // Salva os dados no localStorage
    localStorage.setItem("playerName", name)
    localStorage.setItem("playerWhatsapp", whatsapp)

    // Redireciona para a próxima página
    router.push("/contratacao")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-500 relative">
      {/* Animated background code effect */}
      <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
        <pre className="text-xs text-green-500 animate-scroll whitespace-pre-wrap">
          {Array(50)
            .fill(
              "function generateAIIncome() { return prompt.execute(); }\nconst income = new PassiveIncome('AI');\nconst result = income.generate(500);\nif (result.success) { bank.deposit(result.amount); }\n",
            )
            .join("")}
        </pre>
      </div>

      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        {/* Exit Intent Popup */}
        {showExitPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClosePopup} />

            {/* Modal */}
            <div className="relative bg-gray-900 border-2 border-red-500 rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
              {/* Pulsing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-lg blur opacity-75 animate-pulse"></div>

              <div className="relative bg-gray-900 rounded-lg p-6">
                {/* Close button */}
                <button
                  onClick={handleClosePopup}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Alert icon */}
                <div className="flex justify-center mb-4">
                  <div className="bg-red-500/20 p-3 rounded-full">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </div>

                {/* Headline */}
                <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-white">
                  ⚠️ Espere! Falta só um passo para desbloquear sua simulação com IA
                </h2>

                {/* Subheadline */}
                <p className="text-gray-300 text-center mb-6 text-sm md:text-base">
                  Você está prestes a ver como criar uma página com IA como se fosse para um cliente de verdade — grátis
                  e em menos de 3 minutos.
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-green-500/20 p-1.5 rounded-full">
                      <Shield className="h-4 w-4 text-green-500" />
                    </div>
                    <span className="text-gray-300">Acesso 100% gratuito</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-blue-500/20 p-1.5 rounded-full">
                      <Code className="h-4 w-4 text-blue-500" />
                    </div>
                    <span className="text-gray-300">Criação com IA sem saber programar</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="bg-yellow-500/20 p-1.5 rounded-full">
                      <Gift className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Seu presente será liberado após a simulação</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handlePopupSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Seu nome completo"
                      value={popupName}
                      onChange={(e) => setPopupName(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Seu WhatsApp (com DDD)"
                      value={popupWhatsapp}
                      onChange={(e) => setPopupWhatsapp(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 text-lg shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105"
                  >
                    🚀 Liberar Minha Simulação
                  </Button>
                </form>

                {/* Footer */}
                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                  Você está a segundos de ver como transformar ideias em renda. Não perca essa chance.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Crie e Lucre com <span className="text-green-400">IA</span>
            </h1>
            <p className="text-green-400 text-lg leading-relaxed">
              Descubra como criar serviços valiosos com Inteligência Artificial e gerar
              <br />
              renda extra em minutos, mesmo sem experiência técnica.
            </p>
          </div>

          {showStartForm ? (
            <div className="bg-gray-900 border border-green-500/30 rounded-lg p-8 shadow-lg shadow-green-500/5 max-w-md mx-auto">
              <StartForm onSubmit={handleSubmit} />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="inline-block animate-spin h-12 w-12 border-t-2 border-b-2 border-green-500 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
