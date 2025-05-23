import type React from "react"

import { motion } from "framer-motion"
import { Sparkles, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FormData } from "@/components/collector-form"

interface CollectorPiecesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  variations: string[]
}

export default function CollectorPieces({ formData, updateFormData, variations }: CollectorPiecesProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ piece_count: e.target.value })
  }

  const handleVariationChange = (value: string) => {
    updateFormData({ favorite_variation: value })
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
          {formData.first_name ? `Hi ${formData.first_name}!` : "Your Collection"}
        </h2>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-8">
        <div className="space-y-3">
          <Label htmlFor="pieceCount" className="text-lg text-rose-200">
          How many pieces do you currently have in your collection?
          </Label>
          <Input
            id="piece_count"
            value={formData.piece_count}
            onChange={handleInputChange}
            placeholder="Enter the number of pieces"
            className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg text-rose-200">What was the first Piggybanx Piece you ever acquired or bought directly from the studio?</Label>
          <Input
            id="first_piece"
            value={formData.first_piece}
            onChange={handleInputChange}
            placeholder="Enter the name of your first piece"
            className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg text-rose-200">What are your top 3 variations? (Optional)</Label>

          <RadioGroup
            value={formData.favorite_variation}
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
                    formData.favorite_variation === variation
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
                        formData.favorite_variation === variation ? "text-rose-300" : "text-rose-400/50"
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
