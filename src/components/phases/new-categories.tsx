"use client"

import type React from "react"

import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/components/collector-form"

interface PhaseSixProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function PhaseSix({ formData, updateFormData }: PhaseSixProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ categoryToAdd: e.target.value })
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <PlusCircle size={28} className="text-amber-300" />
        <h2 className="text-2xl font-bold text-amber-100">
          {formData.firstName ? `${formData.firstName}, ` : ""}
          what category would you want added?
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-amber-100/80 mb-6">
        We're always looking to expand our collection categories. Let us know what you'd like to see!
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-3">
        <Label htmlFor="categoryToAdd" className="text-amber-200">
          Suggest a new category
        </Label>
        <Textarea
          id="categoryToAdd"
          value={formData.categoryToAdd}
          onChange={handleInputChange}
          placeholder="Enter your suggestion here..."
          className="min-h-[120px] border-amber-400/30 bg-amber-950/40 text-amber-100 placeholder:text-amber-300/50 focus:border-amber-400 focus:ring-amber-400"
        />
      </motion.div>

      <motion.p variants={itemVariants} className="mt-4 text-sm text-amber-300/70 italic">
        This field is optional. Feel free to skip if you don't have any suggestions.
      </motion.p>
    </motion.div>
  )
}
