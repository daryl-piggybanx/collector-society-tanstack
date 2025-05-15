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

  // Simulate pre-populated data for returning collectors
  const isReturningWithData =
    formData.isReturningCollector && !formData.firstName && !formData.lastName && !formData.discordUsername

  // If returning collector and no data entered yet, populate with mock data
  if (isReturningWithData) {
    setTimeout(() => {
      updateFormData({
        firstName: "Daryl",
        lastName: "Banx",
        discordUsername: "MissPiggy",
      })
    }, 500)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <User size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.isReturningCollector ? "Welcome back!" : "Tell us about yourself"}
        </h2>
      </motion.div>

      {formData.isReturningCollector && (
        <motion.p variants={itemVariants} className="text-rose-100/80 mb-6">
          We've found your information. Feel free to update if needed.
        </motion.p>
      )}

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-rose-200">
              First Name
            </Label>
            <div className="relative">
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.isReturningCollector && (
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
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
                required
              />
              {formData.isReturningCollector && (
                <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discordUsername" className="text-rose-200">
            Discord Username
          </Label>
          <div className="relative">
            <Input
              id="discordUsername"
              name="discordUsername"
              value={formData.discordUsername}
              onChange={handleInputChange}
              placeholder="Enter your Discord username"
              className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400 pl-3 pr-10"
              required
            />
            {formData.isReturningCollector && (
              <Edit size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300" />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
