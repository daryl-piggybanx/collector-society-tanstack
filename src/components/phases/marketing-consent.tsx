import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "@/components/collector-form"
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

interface MarketingConsentProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
}

export default function MarketingConsent({ formData, updateFormData }: MarketingConsentProps) {
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
      {!formData.isReturningCollector && (
      <motion.p variants={itemVariants} className="text-rose-100/80 my-6">
        We'll use this information to keep you updated on new collections and events.
      </motion.p>
      )}
      <motion.div variants={itemVariants} className="space-y-6 my-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-rose-200">
            Email Address
          </Label>
          <div className="flex items-center">
            <Mail size={18} className="text-rose-300 mr-2" />
            <Input
              id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
              placeholder="Email Address"
              className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
              required
            />
          </div>
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
              onChange={(e) => {
                const value = e.target.value;
                // Only update if empty or valid phone number
                if (!value || isValidPhoneNumber(value)) {
                  updateFormData({ phoneNumber: value });
                }
              }}
              placeholder="Phone Number (optional)"
              className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
          {formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber) && (
            <p className="text-rose-400 text-sm mt-1">
              Please enter a valid phone number with country code (e.g., +12345678901)
            </p>
          )}
        </div>

        {!formData.isReturningCollector && (
        <>
        <div className="space-y-3">
              <Checkbox 
            id="marketingConsent" 
            checked={formData.marketingConsent}
            onCheckedChange={(checked) => updateFormData({ marketingConsent: checked === true })}
            className="mt-1 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-400 mr-2 cursor-pointer"
          />
          <Label htmlFor="marketingConsent" className="text-rose-200 cursor-pointer">
            Check this box to also receive promotional marketing texts.
          </Label>
        </div>
        <div className="space-y-3">
          <p className="text-rose-100/80">
            By submitting this form and signing up for texts, you consent to receive marketing text messages (e.g. promos, cart reminders) from PiggyBanx at the number provided, including messages sent by autodialer. Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies. Unsubscribe at any time by replying STOP or clicking the unsubscribe link (where available). 
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-rose-200 mb-4">Communication Preference</Label>
          <RadioGroup
            value={formData.communicationPreference}
            onValueChange={handleCommunicationChange}
            className="flex flex-row gap-4 md:gap-3 md:justify-start md:items-start"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Email"
                id="comm-email"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-email" className="text-rose-100">
                Email
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Phone Number"
                id="comm-phone"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-phone" className="text-rose-100">
                Phone
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="Both"
                id="comm-both"
                className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
              />
              <Label htmlFor="comm-both" className="text-rose-100">
                Both
              </Label>
            </div>
          </RadioGroup>
        </div>
        </>
        )}
      </motion.div>
    </motion.div>
  )
}
