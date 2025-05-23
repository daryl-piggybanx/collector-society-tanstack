"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/components/collector-form"

interface CommunityExperienceProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function CommunityExperience({ formData, updateFormData }: CommunityExperienceProps) {
  const handleCommunityExperienceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ community_experience: e.target.value })
  }

  const handleImprovementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ improvements: e.target.value })
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
        <Users size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.first_name ? `${formData.first_name}, ` : ""}
          share your community experience
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="communityExperience" className="text-lg text-rose-200">
            What is your favorite part about collecting our work or about the community?
          </Label>
          <Textarea
            id="community_experience"
            value={formData.community_experience}
            onChange={handleCommunityExperienceChange}
            placeholder="Tell us what you love most..."
            className="min-h-[120px] border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="improvements" className="text-lg text-rose-200">
            What would make this collecting experience even better?
          </Label>
          <Textarea
            id="improvements"
            value={formData.improvements}
            onChange={handleImprovementsChange}
            placeholder="Share your ideas for improvement..."
            className="min-h-[120px] border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
