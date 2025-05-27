"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface AutoAdvanceOverlayProps {
  isVisible: boolean
  progress: number
}

export function AutoAdvanceOverlay({ isVisible, progress }: AutoAdvanceOverlayProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <div className="bg-gray-900 border-2 border-green-500 p-8 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Loader2 className="h-10 w-10 text-green-400 animate-spin mr-4" />
          <h2 className="text-xl font-bold text-green-400 font-mono">AVANÇANDO SISTEMA</h2>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-green-500 h-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-green-400/70 font-mono">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="bg-black/50 p-3 rounded border border-green-500/20">
          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap animate-pulse">
            <span className="text-green-500">$</span> executando sequência de avanço...
            <br />
            <span>Completando tarefas...</span>
            <br />
            <span>Acumulando recursos...</span>
            <br />
            <span>Desbloqueando níveis...</span>
          </pre>
        </div>
      </div>
    </motion.div>
  )
}
