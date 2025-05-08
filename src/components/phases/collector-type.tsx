"use client"

import { motion } from "framer-motion"
import { UserPlus, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FormData } from "@/components/collector-form"

interface PhaseOneProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function PhaseOne({ formData, updateFormData }: PhaseOneProps) {
  const handleSelection = (isReturning: boolean) => {
    updateFormData({ isReturningCollector: isReturning })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="text-center">
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-amber-100">
        Are you a new or returning collector?
      </motion.h2>

      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 justify-center mt-12">
        <Button
          variant={formData.isReturningCollector === false ? "default" : "outline"}
          size="lg"
          onClick={() => handleSelection(false)}
          className={`flex items-center gap-3 p-8 text-lg transition-all ${
            formData.isReturningCollector === false
              ? "bg-amber-600 hover:bg-amber-500 text-white scale-105"
              : "bg-amber-950/40 border-amber-400/30 text-amber-100 hover:bg-amber-800/50 hover:text-amber-50"
          }`}
        >
          <UserPlus size={24} />
          <span>I'm a new collector</span>
        </Button>

        <Button
          variant={formData.isReturningCollector === true ? "default" : "outline"}
          size="lg"
          onClick={() => handleSelection(true)}
          className={`flex items-center gap-3 p-8 text-lg transition-all ${
            formData.isReturningCollector === true
              ? "bg-amber-600 hover:bg-amber-500 text-white scale-105"
              : "bg-amber-950/40 border-amber-400/30 text-amber-100 hover:bg-amber-800/50 hover:text-amber-50"
          }`}
        >
          <UserCheck size={24} />
          <span>I'm a returning collector</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
