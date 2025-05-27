"use client"

import type React from "react"

import { motion } from "framer-motion"
import { User, Edit } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/components/collector-form"

interface UserIdentityProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function UserIdentity({ formData, updateFormData }: UserIdentityProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
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
        <User size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.is_returning_collector ? "Welcome back!" : "Tell us about yourself"}
        </h2>
      </motion.div>

      {/* {formData.isReturningCollector && (
        <motion.p variants={itemVariants} className="text-rose-100/80 mb-6">
          We've found your information. Feel free to update if needed.
        </motion.p>
      )} */}

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-rose-200">
              First Name
            </Label>
            <div className="relative">
              <Input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.is_returning_collector && (
                <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-rose-200">
              Last Name
            </Label>
            <div className="relative">
              <Input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.is_returning_collector && (
                <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discordUsername" className="text-rose-200">
              Discord Username
            </Label>
            <div className="relative">
              <Input
                id="discord_username"
                name="discord_username"
                value={formData.discord_username}
                onChange={handleInputChange}
                placeholder="Discord Username (optional)"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.is_returning_collector && (
                <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagramHandle" className="text-rose-200">
              Instagram Handle
            </Label>
            <div className="relative">
              <Input
                id="instagram_handle"
                name="instagram_handle"
                value={formData.instagram_handle}
                onChange={handleInputChange}
                placeholder="Instagram Handle (optional)"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.is_returning_collector && (
                <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
