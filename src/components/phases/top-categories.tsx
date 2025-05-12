import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Target, Check, Trophy, Music, Sparkles, Gamepad2, Film, Palette, Car } from "lucide-react"
import type { FormData } from "@/components/collector-form"

interface Preference {
  name: string
  icon: string
}

interface TopCategoriesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  preferences: Preference[]
}

export default function TopCategories({ formData, updateFormData, preferences }: TopCategoriesProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(() => formData.collectPreferences || [])

  const handlePreferenceToggle = (preference: string) => {
    setSelectedPreferences((prev) => {
      // If already selected, remove it
      if (prev.includes(preference)) {
        return prev.filter((p) => p !== preference)
      }

      // If not selected and we have less than 4, add it
      if (prev.length < 4) {
        return [...prev, preference]
      }

      return prev
    })
  }

  // Only update form data when selectedPreferences changes, but exclude updateFormData from dependencies
  useEffect(() => {
    // Prevent infinite loop by checking if the values are actually different
    if (JSON.stringify(formData.collectPreferences) !== JSON.stringify(selectedPreferences)) {
      updateFormData({ collectPreferences: selectedPreferences })
    }
  }, [selectedPreferences, formData.collectPreferences])

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

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = isSelected ? "text-rose-200" : "text-rose-100/60"
    const iconSize = 24

    switch (iconName) {
      case "trophy":
        return <Trophy size={iconSize} className={iconClass} />
      case "music":
        return <Music size={iconSize} className={iconClass} />
      case "sparkles":
        return <Sparkles size={iconSize} className={iconClass} />
      case "gamepad-2":
        return <Gamepad2 size={iconSize} className={iconClass} />
      case "film":
        return <Film size={iconSize} className={iconClass} />
      case "palette":
        return <Palette size={iconSize} className={iconClass} />
      case "car":
        return <Car size={iconSize} className={iconClass} />
      default:
        return <Target size={iconSize} className={iconClass} />
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <Target size={28} className="text-rose-300" />
        <h2 className="text-2xl font-bold text-rose-100">
          {formData.firstName ? `${formData.firstName}, ` : ""}
          what do you want to collect?
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-rose-100/80 mb-6">
        Select up to 4 categories (order matters)
      </motion.p>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {preferences.map((preference, index) => {
          const isSelected = selectedPreferences.includes(preference.name)
          const isDisabled = !isSelected && selectedPreferences.length >= 4

          return (
            <motion.div
              key={preference.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: index * 0.05 + 0.2 },
              }}
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              className={`relative rounded-lg overflow-hidden ${isDisabled ? "opacity-50" : ""}`}
            >
              <button
                onClick={() => handlePreferenceToggle(preference.name)}
                disabled={isDisabled}
                className={`w-full h-full p-6 text-center transition-all ${
                  isSelected
                    ? "bg-rose-800/60 border-2 border-rose-500"
                    : "bg-rose-950/40 border border-rose-400/30 hover:border-rose-400/60"
                } rounded-lg flex flex-col items-center justify-center gap-3`}
              >
                {renderIcon(preference.icon, isSelected)}
                <span className={`font-medium ${isSelected ? "text-rose-200" : "text-rose-100/80"}`}>
                  {preference.name}
                </span>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    {selectedPreferences.indexOf(preference.name) + 1}
                  </div>
                )}
              </button>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 text-center text-rose-100/80">
        {selectedPreferences.length > 0 ? (
          <div className="flex items-center justify-center gap-2 text-rose-300">
            <Check size={18} />
            <span>
              {selectedPreferences.length === 4
                ? "You've selected 4 categories!"
                : `You've selected ${selectedPreferences.length} ${
                    selectedPreferences.length === 1 ? "category" : "categories"
                  }`}
            </span>
          </div>
        ) : (
          <span>Please select at least one category</span>
        )}
      </motion.div>
    </motion.div>
  )
}
