import type React from "react"

import { motion } from "framer-motion"
import { Sparkles, Users, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { FormData } from "@/components/collector-form"

interface CollectorPiecesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  variations: string[]
}

export default function CollectorPieces({ formData, updateFormData, variations }: CollectorPiecesProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  }

  // Get currently selected variations in order
  const getSelectedVariations = (): string[] => {
    const selected: string[] = [];
    if (formData.favorite_variation) selected.push(formData.favorite_variation);
    if (formData.favorite_variation_2) selected.push(formData.favorite_variation_2);
    if (formData.favorite_variation_3) selected.push(formData.favorite_variation_3);
    return selected;
  }

  const handleVariationSelect = (variation: string) => {
    const currentSelected = getSelectedVariations();
    
    // If already selected, remove it and shift others up
    if (currentSelected.includes(variation)) {
      const filtered = currentSelected.filter(v => v !== variation);
      updateFormData({
        favorite_variation: filtered[0] || "",
        favorite_variation_2: filtered[1] || "",
        favorite_variation_3: filtered[2] || "",
      });
    } else {
      // Add to the end if we have space (max 3)
      if (currentSelected.length < 3) {
        const newSelected = [...currentSelected, variation];
        updateFormData({
          favorite_variation: newSelected[0] || "",
          favorite_variation_2: newSelected[1] || "",
          favorite_variation_3: newSelected[2] || "",
        });
      }
    }
  }

  const removeVariation = (indexToRemove: number) => {
    const currentSelected = getSelectedVariations();
    const filtered = currentSelected.filter((_, index) => index !== indexToRemove);
    updateFormData({
      favorite_variation: filtered[0] || "",
      favorite_variation_2: filtered[1] || "",
      favorite_variation_3: filtered[2] || "",
    });
  }

  const selectedVariations = getSelectedVariations();

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
            name="piece_count"
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
            name="first_piece"
            value={formData.first_piece}
            onChange={handleInputChange}
            placeholder="Enter the name of your first piece"
            className="border-rose-400/30 bg-rose-950/40 text-rose-100 placeholder:text-rose-300/50 focus:border-rose-400 focus:ring-rose-400"
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-lg text-rose-200">What are your top 3 variations? (Optional)</Label>
            <p className="text-sm text-rose-400/50">Select up to 3 variations. Order matters - first selected will be your #1 favorite.</p>
          </div>

          {/* Selected variations display */}
          {selectedVariations.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm text-rose-300">Your selections (in order of preference):</Label>
              <div className="space-y-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                {selectedVariations.map((variation, index) => (
                  <motion.div
                    key={`selected-${variation}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between p-3 bg-rose-900/50 border border-rose-500/50 rounded-lg max-w-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 bg-rose-500 text-white text-sm font-bold rounded-full">
                        {index + 1}
                      </span>
                      <Sparkles size={16} className="text-rose-300" />
                      <span className="text-rose-100">{variation}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariation(index)}
                      className="h-8 w-8 p-0 text-rose-400 hover:text-rose-200 hover:bg-rose-800/50"
                    >
                      <X size={16} />
                    </Button>
                  </motion.div>
                ))}
              </div>
              <hr className="my-4 border-rose-400/30" />
            </div>
          )}

          {/* Available variations to select */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {variations.map((variation, index) => {
              const isSelected = selectedVariations.includes(variation);
              const isDisabled = !isSelected && selectedVariations.length >= 3;
              
              return (
                <motion.div
                  key={variation}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: isDisabled ? 0.5 : 1,
                    y: 0,
                    transition: { delay: index * 0.1 + 0.3 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => !isDisabled && handleVariationSelect(variation)}
                    disabled={isDisabled}
                    className={`w-full p-4 h-auto text-left transition-all ${
                      isSelected
                        ? "border-rose-500 bg-rose-900/50 text-rose-100"
                        : isDisabled
                        ? "border-rose-400/20 bg-rose-950/20 text-rose-400/50 cursor-not-allowed"
                        : "border-rose-400/30 bg-rose-950/40 text-rose-100 hover:border-rose-400/60 hover:bg-rose-900/30 hover:text-rose-100/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles
                        size={18}
                        className={`${
                          isSelected 
                            ? "text-rose-300" 
                            : isDisabled 
                            ? "text-rose-400/30" 
                            : "text-rose-400/50"
                        }`}
                      />
                      <span>{variation}</span>
                      {isSelected && (
                        <span className="ml-auto text-xs bg-rose-500 text-white px-2 py-1 rounded-full">
                          #{selectedVariations.indexOf(variation) + 1}
                        </span>
                      )}
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
