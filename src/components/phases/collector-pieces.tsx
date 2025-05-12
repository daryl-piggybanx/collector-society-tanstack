import type React from "react"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/components/collector-form"
import GroupIcon from "@/components/icons/group-icon"

interface PhaseFourProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  variations: string[]
}

export default function PhaseFour({ formData, updateFormData, variations }: PhaseFourProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ pieceCount: e.target.value })
  }

  const handleVariationChange = (value: string) => {
    updateFormData({ favoriteVariation: value })
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
        <GroupIcon />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.firstName ? `Hi ${formData.firstName}!` : "Your Collection"}
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="pieceCount" className="text-lg text-rose-200">
            How many pieces do you have?
          </Label>
          <Input
            id="pieceCount"
            value={formData.pieceCount}
            onChange={handleInputChange}
            placeholder="Enter the number of pieces"
            className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg text-rose-200">What is your favorite variation? (Optional)</Label>

          <RadioGroup
            value={formData.favoriteVariation}
            onValueChange={handleVariationChange}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2"
          >
            {variations.map((variation, index) => (
              <motion.div
                key={variation}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 + 0.3 },
                }}
              >
                <Label
                  htmlFor={`variation-${variation}`}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.favoriteVariation === variation
                      ? "border-rose-500 bg-rose-900/50"
                      : "border-rose-400/30 bg-rose-950/40 hover:border-rose-400/60"
                  }`}
                >
                  <RadioGroupItem
                    value={variation}
                    id={`variation-${variation}`}
                    className="data-[state=checked]:border-rose-500 data-[state=checked]:text-rose-500"
                  />
                  <div className="ml-3 flex items-center">
                    <Sparkles
                      size={18}
                      className={`mr-2 ${
                        formData.favoriteVariation === variation ? "text-rose-300" : "text-rose-400/50"
                      }`}
                    />
                    <span className="text-rose-100">{variation}</span>
                  </div>
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </div>
      </motion.div>
    </motion.div>
  )
}
