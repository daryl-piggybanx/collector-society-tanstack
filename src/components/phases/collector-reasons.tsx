"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/components/collector-form"

interface CollectorReasonsProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function CollectorReasons({ formData, updateFormData }: CollectorReasonsProps) {
  const handleCollectionReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ collectionReason: e.target.value })
  }

  const handleInterestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ interests: e.target.value })
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
        <Heart size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.firstName ? `${formData.firstName}, ` : ""}
          tell us more about your interest
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="collectionReason" className="text-lg text-rose-200">
          Why do you want to collect our art?
          </Label>
          <Textarea
            id="collectionReason"
            value={formData.collectionReason}
            onChange={handleCollectionReasonChange}
            placeholder="Share your motivation for collecting..."
            className="min-h-[120px] border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="interests" className="text-lg text-rose-200">
            What interests you the most about our work?
          </Label>
          <Textarea
            id="interests"
            value={formData.interests}
            onChange={handleInterestsChange}
            placeholder="Tell us what draws you to our art..."
            className="min-h-[120px] border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}