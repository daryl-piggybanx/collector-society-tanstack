import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { FormData } from "../collector-form"
import { Check, ChevronRight } from "lucide-react"

interface PhaseTwoProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

const PhaseTwo = ({ formData, updateFormData, onNext }: PhaseTwoProps) => {
  const [allChecked, setAllChecked] = useState(false)

  // Sample rules - in a real app, these would come from an API
  const rules = [
    "I understand that I must follow all community guidelines",
    "I agree to be respectful to other collectors in the community",
    "I will report any suspicious activity to the moderators",
  ]

  useEffect(() => {
    // Check if all rules are accepted
    setAllChecked(formData.rulesAccepted.every((rule) => rule))
  }, [formData.rulesAccepted])

  const handleCheckboxChange = (index: number) => {
    const newRulesAccepted = [...formData.rulesAccepted]
    newRulesAccepted[index] = !newRulesAccepted[index]
    updateFormData({ rulesAccepted: newRulesAccepted })
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-2 text-[#23384F]">
        {formData.isReturningCollector ? "Welcome back" : "Before we get started"}
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {formData.isReturningCollector ? "Here is a reminder of our rules" : "Please review our collecting rules"}
      </p>

      <div className="space-y-4 mb-8">
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <div
              className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-colors ${
                formData.rulesAccepted[index]
                  ? "bg-[#23384F] border-[#23384F]"
                  : "border-gray-300 hover:border-[#23384F]"
              }`}
              onClick={() => handleCheckboxChange(index)}
            >
              {formData.rulesAccepted[index] && <Check size={16} className="text-white" />}
            </div>
            <label className="text-gray-700 cursor-pointer" onClick={() => handleCheckboxChange(index)}>
              {rule}
            </label>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={allChecked ? { scale: 1.05 } : {}}
        whileTap={allChecked ? { scale: 0.95 } : {}}
        className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
          allChecked ? "bg-[#23384F] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        onClick={allChecked ? onNext : undefined}
        disabled={!allChecked}
      >
        Continue
        <ChevronRight size={18} />
      </motion.button>
    </div>
  )
}

export default PhaseTwo
