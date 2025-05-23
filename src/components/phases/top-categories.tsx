import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Target, Check, Trophy, Music, Sparkles, Gamepad2, Film, Palette, Car, ChevronDown } from "lucide-react"
import type { FormData } from "@/components/collector-form"

interface Preference {
  name: string
  icon: string
  subcategories: string[]
}

interface TopCategoriesProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  preferences: Preference[]
}

export default function TopCategories({ formData, updateFormData, preferences }: TopCategoriesProps) {
  const [selectedPreference, setSelectedPreference] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [showSubcategories, setShowSubcategories] = useState(false)

  const handlePreferenceToggle = (preference: Preference) => {
    if (selectedPreference === preference.name) {
      // If clicking the same preference, toggle subcategories
      setShowSubcategories(!showSubcategories)
      return
    }

    // Select new preference
    setSelectedPreference(preference.name)
    setSelectedSubcategory(null)
    // Always show subcategories if the preference has them
    setShowSubcategories(preference.subcategories.length > 0)
    
    // Update form data with the main category
    updateFormData({ collect_preferences: [preference.name] })
  }

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory)
    // Update form data with the subcategory
    updateFormData({ collect_preferences: [subcategory] })
    // Keep the subcategories visible
    setShowSubcategories(true)
  }

  // Initialize from form data if it exists
  useEffect(() => {
    if (formData.collect_preferences && formData.collect_preferences.length > 0) {
      const selected = formData.collect_preferences[0]
      const preference = preferences.find(p => p.name === selected || p.subcategories.includes(selected))
      if (preference) {
        setSelectedPreference(preference.name)
        if (preference.subcategories.includes(selected)) {
          setSelectedSubcategory(selected)
        }
      }
    }
  }, [formData.collect_preferences, preferences])

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
          {formData.first_name ? `${formData.first_name}, ` : ""}
          what do you want to collect?
        </h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-rose-100/80 mb-6">
        Select one category that interests you
      </motion.p>

      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {preferences.map((preference, index) => {
          const isSelected = selectedPreference === preference.name
          const hasSubcategories = preference.subcategories.length > 0
          const isSubcategorySelected = preference.subcategories.includes(selectedSubcategory || '')

          return (
            <motion.div
              key={preference.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: index * 0.05 + 0.2 },
              }}
              whileHover={isSelected && showSubcategories ? {} : { scale: 1.05 }}
              className="relative rounded-lg overflow-visible"
            >
              <button
                onClick={() => handlePreferenceToggle(preference)}
                className={`w-full h-full p-6 text-center transition-all ${
                  (isSelected || isSubcategorySelected)
                    ? "bg-rose-800/60 border-2 border-rose-500"
                    : "bg-rose-950/40 border border-rose-400/30 hover:border-rose-400/60"
                } rounded-lg flex flex-col items-center justify-center gap-3`}
              >
                {renderIcon(preference.icon, isSelected || isSubcategorySelected)}
                <span className={`font-medium ${(isSelected || isSubcategorySelected) ? "text-rose-200" : "text-rose-100/80"}`}>
                  {preference.name}
                </span>
                {hasSubcategories && (
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${showSubcategories && isSelected ? 'rotate-180' : ''} text-rose-100/60`}
                  />
                )}
              </button>

              {/* Subcategories dropdown */}
              <AnimatePresence>
                {isSelected && showSubcategories && hasSubcategories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 mt-2 bg-rose-950/90 border border-rose-400/30 rounded-lg overflow-hidden z-10 shadow-lg pointer-events-auto"
                  >
                    <p className="text-rose-100/80 text-sm p-2">More specificic (optional)</p>
                    <hr className="border-rose-400/30 mx-3" />
                    {preference.subcategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        onClick={() => handleSubcategorySelect(subcategory)}
                        className={`w-full p-3 text-left transition-all ${
                          selectedSubcategory === subcategory
                            ? "bg-rose-800/60 text-rose-200"
                            : "text-rose-100/80 hover:bg-rose-800/30"
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div variants={itemVariants} className="mt-6 text-center text-rose-100/80">
        {(selectedPreference || selectedSubcategory) ? (
          <div className="flex items-center justify-center gap-2 text-rose-300">
            <Check size={18} />
            <span>
              {selectedSubcategory 
                ? `Selected: ${selectedSubcategory}`
                : `Selected: ${selectedPreference}`}
            </span>
          </div>
        ) : (
          <span>Please select a category</span>
        )}
      </motion.div>
    </motion.div>
  )
}
