import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/components/collector-form"

interface PhaseSevenProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onSubmit: () => void
  isSubmitting: boolean
}

export default function PhaseSeven({ formData, updateFormData, onSubmit, isSubmitting }: PhaseSevenProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleCommunicationChange = (value: string) => {
    updateFormData({ communicationPreference: value })
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
        <Mail size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.firstName ? `${formData.firstName}, ` : ""}
          how can we reach you?
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-rose-100/80 mb-6">
        We'll use this information to keep you updated on new collections and events.
      </motion.p>

      <motion.div variants={itemVariants} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-rose-200">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="phoneNumber" className="text-rose-200">
            Phone Number
          </Label>
          <div className="flex items-center">
            <Phone size={18} className="text-rose-300 mr-2" />
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-rose-200">Communication Preference</Label>
          <RadioGroup
            value={formData.communicationPreference}
            onValueChange={handleCommunicationChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="email"
                id="comm-email"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-email" className="text-rose-100">
                Email
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="phone"
                id="comm-phone"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-phone" className="text-rose-100">
                Phone
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="both"
                id="comm-both"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-both" className="text-rose-100">
                Both
              </Label>
            </div>
          </RadioGroup>
        </div>
      </motion.div>
    </motion.div>
  )
}
