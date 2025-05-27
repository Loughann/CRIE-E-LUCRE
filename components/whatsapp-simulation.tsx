"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, CheckCheck, Send, Loader2, ArrowRight, DollarSign, MoreVertical, Phone, Video } from "lucide-react"

interface WhatsappSimulationProps {
  playerName: string
  onComplete: () => void
  conversationPart?: "before" | "after"
}

export function WhatsappSimulation({ playerName, onComplete, conversationPart = "before" }: WhatsappSimulationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Mensagens mais curtas e naturais da primeira parte
  const beforeMessages = [
    {
      sender: "client",
      content: `Oi ${playerName}! Vi seu anúncio sobre sites com IA. Preciso de um site pra minha loja. Pode me ajudar?`,
      delay: 1000,
    },
    {
      sender: "user",
      content: `Oi! Claro, posso sim! Faço sites profissionais bem rápido. Que tipo de loja você tem?`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `Produtos naturais. Quero vender online e passar confiança pros clientes.`,
      delay: 2000,
    },
    {
      sender: "user",
      content: `Perfeito! Faço um site lindo pra sua loja, com tudo que precisa pra vender bem online.`,
      delay: 2500,
    },
    {
      sender: "client",
      content: `Legal! Quanto custa e quanto tempo demora?`,
      delay: 2000,
    },
    {
      sender: "user",
      content: `R$ 997 e entrego em 3 dias. Bem mais rápido que a concorrência!`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `3 dias mesmo? Não vai ficar mal feito não?`,
      delay: 2000,
    },
    {
      sender: "user",
      content: `Relaxa! Uso IA pra acelerar, mas a qualidade é top. Ainda dou 2 rodadas de ajustes.`,
      delay: 2500,
    },
    {
      sender: "client",
      content: `Fechou! Como é o pagamento?`,
      delay: 1500,
    },
    {
      sender: "user",
      content: `50% agora (R$ 498,50) e 50% na entrega. PIX ou transferência, como preferir.`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `PIX é melhor. Manda o link aí.`,
      delay: 1500,
    },
    {
      sender: "user",
      content: `Mandei! Assim que cair aqui já começo seu projeto.`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `Pago! Ansiosa pra ver o resultado.`,
      delay: 1500,
    },
    {
      sender: "user",
      content: `Recebido! Valeu a confiança. Já vou começar e te mantenho informada.`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `Perfeito!`,
      delay: 1000,
      isBreakpoint: true,
    },
  ]

  // Mensagens mais curtas e naturais da segunda parte
  const afterMessages = [
    {
      sender: "system",
      content: `--- 3 dias depois ---`,
      delay: 1500,
    },
    {
      sender: "user",
      content: `Oi! Seu site ficou pronto! Dá uma olhada no link que mandei.`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `Nossa! Ficou incrível! Muito melhor que eu imaginava. Adorei tudo!`,
      delay: 2500,
    },
    {
      sender: "user",
      content: `Que bom que gostou! Quer algum ajuste ou tá perfeito assim?`,
      delay: 2000,
    },
    {
      sender: "client",
      content: `Tá perfeito! Vou pagar o restante agora.`,
      delay: 1500,
    },
    {
      sender: "client",
      content: `Pago! Muito obrigada pelo trabalho incrível.`,
      delay: 1500,
    },
    {
      sender: "user",
      content: `Recebido! Obrigado pela confiança. Mandando todos os acessos agora. Qualquer coisa é só chamar!`,
      delay: 2500,
    },
    {
      sender: "client",
      content: `Já vou indicar você pros meus amigos empresários!`,
      delay: 2000,
    },
    {
      sender: "system",
      content: `💰 Você recebeu R$ 997,00 pelo serviço de criação de site`,
      delay: 1500,
      isLast: true,
    },
  ]

  // Selecionar as mensagens com base na parte da conversa
  const messages = conversationPart === "before" ? beforeMessages : afterMessages

  // Efeito para avançar automaticamente na conversa
  useEffect(() => {
    if (currentStep < messages.length) {
      const message = messages[currentStep]

      if (message.sender === "client" || message.sender === "system") {
        setIsTyping(true)

        const typingTimer = setTimeout(() => {
          setIsTyping(false)
          setCurrentStep(currentStep + 1)

          // Se for a mensagem de breakpoint ou a última mensagem, mostrar o botão de próximo
          if (message.isBreakpoint || message.isLast) {
            setShowCheckmark(true)
            setTimeout(() => {
              setShowNextButton(true)
            }, 1000)
          }
        }, message.delay)

        return () => clearTimeout(typingTimer)
      } else {
        // Para mensagens do usuário, apenas esperar o delay e avançar
        const userMessageTimer = setTimeout(() => {
          setCurrentStep(currentStep + 1)
        }, message.delay)

        return () => clearTimeout(userMessageTimer)
      }
    }
  }, [currentStep, messages])

  // Efeito para rolar para o final da conversa quando novas mensagens aparecem
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [currentStep, isTyping])

  const handleComplete = () => {
    setIsComplete(true)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-2xl">
      {/* Header do WhatsApp - Idêntico ao original */}
      <div className="bg-[#075E54] p-3 flex items-center justify-between text-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
            <img
              src="/placeholder.svg?height=40&width=40&text=👤"
              alt="Cliente"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-white">Cliente - Produtos Naturais</h3>
            <p className="text-xs text-gray-200">online</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="h-5 w-5 text-white" />
          <Phone className="h-5 w-5 text-white" />
          <MoreVertical className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Área de chat com background do WhatsApp */}
      <div
        ref={chatContainerRef}
        className="h-96 overflow-y-auto p-4"
        style={{
          backgroundColor: "#E5DDD5",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        {/* Data e hora */}
        <div className="text-center mb-4">
          <span className="inline-block bg-white/80 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>

        {/* Mensagens */}
        {messages.slice(0, currentStep).map((message, index) => (
          <div
            key={index}
            className={`mb-3 flex ${
              message.sender === "user"
                ? "justify-end"
                : message.sender === "system"
                  ? "justify-center"
                  : "justify-start"
            }`}
          >
            {message.sender === "system" ? (
              <div className="bg-white/80 text-gray-600 text-xs px-3 py-1 rounded-full shadow-sm">
                {message.content}
              </div>
            ) : (
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg shadow-sm relative ${
                  message.sender === "user"
                    ? "bg-[#DCF8C6] text-gray-800 rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
                style={{
                  wordBreak: "break-word",
                }}
              >
                {/* Seta da bolha */}
                <div
                  className={`absolute bottom-0 w-0 h-0 ${
                    message.sender === "user"
                      ? "right-[-8px] border-l-[8px] border-l-[#DCF8C6] border-b-[8px] border-b-transparent"
                      : "left-[-8px] border-r-[8px] border-r-white border-b-[8px] border-b-transparent"
                  }`}
                />

                {message.sender === "system" && message.content.includes("R$") ? (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <p className="text-sm">{message.content}</p>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}

                {/* Horário e status */}
                <div
                  className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.sender === "user" ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  <span className="text-[11px]">
                    {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, "0")}
                  </span>
                  {message.sender === "user" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Indicador de digitação */}
        {isTyping && (
          <div className="mb-3 flex justify-start">
            <div className="max-w-[75%] px-3 py-2 rounded-lg bg-white shadow-sm rounded-bl-none relative">
              {/* Seta da bolha */}
              <div className="absolute bottom-0 left-[-8px] w-0 h-0 border-r-[8px] border-r-white border-b-[8px] border-b-transparent" />

              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        {/* Checkmark de confirmação */}
        {showCheckmark && (
          <div className="flex justify-center my-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg"
            >
              {conversationPart === "before" ? (
                <ArrowRight className="h-8 w-8 text-white" />
              ) : (
                <DollarSign className="h-8 w-8 text-white" />
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Área de input - Idêntica ao WhatsApp */}
      <div className="bg-[#F0F0F0] p-2 flex items-center space-x-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
          <span className="text-gray-500 text-sm flex-1">Digite uma mensagem</span>
        </div>
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
          <Send className="h-5 w-5 text-white ml-1" />
        </div>
      </div>

      {/* Botão de próximo */}
      <AnimatePresence>
        {showNextButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 bg-white border-t border-gray-200"
          >
            <Button
              onClick={handleComplete}
              className="w-full bg-[#25D366] hover:bg-[#20B858] text-white font-medium py-3 rounded-lg"
              disabled={isComplete}
            >
              {isComplete ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {conversationPart === "before" ? (
                    <>
                      INICIAR DESENVOLVIMENTO DO PROJETO
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      CONCLUIR ATENDIMENTO
                      <Check className="ml-2 h-5 w-5" />
                    </>
                  )}
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
