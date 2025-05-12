import { motion } from "framer-motion"
import { Check, ScrollText } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { FormData } from "@/components/collector-form"

interface PhaseTwoProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  rules: string[]
}

export default function PhaseTwo({ formData, updateFormData, rules }: PhaseTwoProps) {
  const handleRuleCheck = (index: number, checked: boolean) => {
    const updatedRules = [...formData.rulesAccepted]
    updatedRules[index] = checked
    updateFormData({ rulesAccepted: updatedRules })
  }

  const allRulesAccepted = formData.rulesAccepted.every((rule) => rule)

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
        <ScrollText size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.isReturningCollector ? "Welcome back!" : "Before we get started"}
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-lg mb-8 text-rose-100/90">
        {formData.isReturningCollector ? "Here is a reminder of our rules" : "Please review our collecting rules"}
      </motion.p>

      <motion.div variants={itemVariants} className="bg-rose-950/50 rounded-lg p-6 border border-rose-400/30">
        <ul className="space-y-4">
          {rules.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: index * 0.1 + 0.3 },
              }}
              className="flex items-start gap-3"
            >
              <Checkbox
                id={`rule-${index}`}
                checked={formData.rulesAccepted[index]}
                onCheckedChange={(checked) => handleRuleCheck(index, checked === true)}
                className="mt-1 data-[state=checked]:bg-rose-500 data-[state=checked]:text-white border-rose-400"
              />
              <label htmlFor={`rule-${index}`} className="text-rose-100/90 cursor-pointer">
                {rule}
              </label>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`mt-6 flex items-center justify-center p-3 rounded-md transition-all ${
          allRulesAccepted ? "bg-green-900/30 text-green-300" : "bg-rose-950/50 text-rose-300/50"
        }`}
      >
        <Check size={18} className="mr-2" />
        <span>
          {allRulesAccepted ? "All rules accepted! You can continue." : "Please accept all rules to continue"}
        </span>
      </motion.div>
    </motion.div>
  )
}
