"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User, Loader2, Lock } from "lucide-react"

interface SimulationStep2Props {
  onComplete: () => void
}

export function SimulationStep2({ onComplete }: SimulationStep2Props) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [conversation, setConversation] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isChatLocked, setIsChatLocked] = useState(false)
  const conversationEndRef = useRef<HTMLDivElement>(null)
  const [selectedService, setSelectedService] = useState<string>("Página de Vendas")

  // Get the selected service from localStorage
  useEffect(() => {
    const service = localStorage.getItem("selectedService")
    if (service) {
      setSelectedService(service)
    }
  }, [])

  // Set default prompt when service changes
  useEffect(() => {
    setPrompt(getDefaultPrompt())
  }, [selectedService])

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, currentTypingText])

  // Typing effect for assistant responses
  useEffect(() => {
    if (!isTyping || !conversation.length) return

    const lastMessage = conversation[conversation.length - 1]
    if (lastMessage.role !== "assistant") return

    const text = lastMessage.content
    if (typingIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentTypingText(text.substring(0, typingIndex + 1))
        setTypingIndex(typingIndex + 1)
      }, 10) // Speed of typing
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [isTyping, typingIndex, conversation])

  // Predefined prompts based on service type
  function getDefaultPrompt() {
    switch (selectedService) {
      case "Página de Vendas":
        return "Crie uma página de vendas persuasiva para um curso de marketing digital. O curso ensina como usar redes sociais para atrair clientes."
      case "Design com IA":
        return "Preciso de instruções para criar um logo para uma empresa de tecnologia chamada TechFusion. Quero um design moderno e minimalista."
      case "Script de Atendimento":
        return "Crie um script de atendimento para vendedores de um serviço de consultoria financeira. O objetivo é converter leads em clientes pagantes."
      default:
        return "Crie uma página de vendas persuasiva para um curso de marketing digital."
    }
  }

  const handleSubmit = () => {
    if (!prompt.trim() || isGenerating || isComplete) return

    // Add user message to conversation
    setConversation([...conversation, { role: "user", content: prompt }])
    setIsGenerating(true)

    // Store the prompt
    localStorage.setItem("userPrompt", prompt)

    // Lock the chat after first prompt
    setIsChatLocked(true)

    // Simulate API call to ChatGPT
    setTimeout(() => {
      // Generate a simple response that mentions we're creating the content
      const response =
        "Gerando seu " +
        selectedService.toLowerCase() +
        " conforme solicitado. Por favor, aguarde enquanto processo seu pedido..."

      // Store the service type for the image generation
      localStorage.setItem("generatedService", selectedService)

      // Add assistant message to conversation
      setConversation((prev) => [...prev, { role: "assistant", content: response }])

      // Start typing effect
      setIsTyping(true)
      setCurrentTypingText("")
      setTypingIndex(0)

      setIsGenerating(false)

      // After typing is complete, wait a moment and then show the "complete" button
      setTimeout(() => {
        setIsComplete(true)
        onComplete()
      }, 3000)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleComplete = () => {
    setIsComplete(true)
    onComplete()
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2">CHATGPT WORKSPACE</h2>
        <p className="text-green-300/70 font-mono">
          Criando: <span className="text-green-400">{selectedService}</span>
        </p>
      </div>

      <div className="bg-gray-900 border border-green-500/30 rounded-lg overflow-hidden">
        {/* ChatGPT header */}
        <div className="bg-gray-950 p-4 border-b border-green-500/30 flex items-center justify-between">
          <div className="flex items-center">
            <Bot className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-green-400 font-mono">ChatGPT Terminal</span>
          </div>

          {isChatLocked && (
            <div className="flex items-center text-yellow-400 text-sm font-mono">
              <Lock className="h-4 w-4 mr-1" />
              <span>Chat bloqueado</span>
            </div>
          )}
        </div>

        {/* Conversation area */}
        <div className="p-4 h-96 overflow-y-auto bg-black/30">
          {/* Welcome message */}
          {conversation.length === 0 && (
            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-green-400 font-mono text-sm">
                <Bot className="h-4 w-4 inline-block mr-2" />
                Olá! Estou pronto para ajudar você a criar um{" "}
                <span className="text-green-300 font-bold">{selectedService}</span>. Digite suas instruções ou use o
                prompt sugerido.
              </p>
            </div>
          )}

          {/* Conversation messages */}
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 ${message.role === "user" ? "bg-green-900/20" : "bg-gray-800/50"} rounded-lg`}
            >
              <p className="text-green-400 font-mono text-sm">
                {message.role === "user" ? (
                  <User className="h-4 w-4 inline-block mr-2" />
                ) : (
                  <Bot className="h-4 w-4 inline-block mr-2" />
                )}
                {message.role === "assistant" && index === conversation.length - 1 && isTyping
                  ? currentTypingText
                  : message.content}
              </p>
            </div>
          ))}

          {/* Loading indicator */}
          {isGenerating && (
            <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-green-400 font-mono text-sm flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Gerando resposta...
              </p>
            </div>
          )}

          {/* Invisible element for auto-scrolling */}
          <div ref={conversationEndRef} />
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-green-500/30 bg-gray-950">
          <div className="flex space-x-2">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isChatLocked ? "Chat bloqueado após o primeiro prompt" : "Digite suas instruções para o ChatGPT..."
              }
              className={`flex-1 bg-gray-800 border-green-500/50 text-green-100 font-mono focus:border-green-400 focus:ring-green-400/20 min-h-[80px] ${isChatLocked ? "opacity-50" : ""}`}
              disabled={isGenerating || isComplete || isChatLocked}
            />
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-black font-mono self-end h-10"
              disabled={!prompt.trim() || isGenerating || isComplete || isChatLocked}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {isChatLocked && (
            <div className="mt-2 text-center text-yellow-400/70 text-xs font-mono">
              O chat foi bloqueado para simular uma experiência real de uso do ChatGPT.
            </div>
          )}
        </div>
      </div>

      {/* Complete button - only show when content has been generated */}
      {conversation.length > 0 && conversation[conversation.length - 1].role === "assistant" && !isTyping && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleComplete}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-black font-mono py-2 px-8 text-lg"
            disabled={isComplete}
          >
            {isComplete ? "CONTEÚDO APROVADO" : "USAR ESTE CONTEÚDO"}
          </Button>
        </div>
      )}
    </div>
  )
}
