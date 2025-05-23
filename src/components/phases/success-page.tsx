"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  User,
  MessageSquare,
  Star,
  Target,
  Plus,
  Mail,
  Phone,
  Trophy,
  Music,
  Sparkles,
  Gamepad2,
  Film,
  Palette,
  Car,
} from "lucide-react"
import type { FormData } from "@/components/collector-form"

interface SuccessPageProps {
  formData: FormData
  preferences: { name: string; icon: string }[]
  variations: string[]
}

export default function SuccessPage({ formData, preferences, variations }: SuccessPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Find the selected preference objects
  const selectedPreferences = formData.collectPreferences?.map(
    (name) => preferences.find((p) => p.name === name) || { name, icon: "target" },
  ) || [];

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    const iconClass = "text-rose-300"
    const iconSize = 18

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
      <motion.div variants={itemVariants} className="mb-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 w-100">
          <CheckCircle size={40} className="text-rose-100" />
        </div>
        <h2 className="text-3xl font-bold text-rose-100">Success!</h2>
        <p className="text-rose-100/80 mt-2">Thank you for completing your collector profile.</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-rose-900/40 to-orange-800/40 rounded-xl p-6 border border-rose-400/30 mb-8 backdrop-blur-sm"
      >
        <h3 className="text-xl font-semibold text-rose-200 mb-4">Your Collector Character Sheet</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User size={20} className="text-rose-300 mt-1" />
              <div>
                <h4 className="font-medium text-rose-200">Personal Info</h4>
                <p className="text-rose-100">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-rose-100/70 text-sm">{formData.discordUsername}</p>
              </div>
            </div>

            {formData.isReturningCollector && (
              <div className="flex items-start gap-3">
                <MessageSquare size={20} className="text-rose-300 mt-1" />
                <div>
                  <h4 className="font-medium text-rose-200">Collection Stats</h4>
                  <p className="text-rose-100">{formData.pieceCount} pieces in collection</p>
                  {formData.favoriteVariation && (
                    <p className="text-rose-100/70">
                      Favorite variation: <span className="text-rose-300">{formData.favoriteVariation}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Target size={20} className="text-rose-300 mt-1" />
              <div>
                <h4 className="font-medium text-rose-200">Collection Interests</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedPreferences.map((preference, index) => (
                    <div
                      key={preference.name}
                      className="inline-flex items-center gap-1 bg-rose-800/60 text-rose-100 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{index + 1}. </span>
                      {renderIcon(preference.icon)}
                      <span>{preference.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {formData.categoryToAdd && (
              <div className="flex items-start gap-3">
                <Plus size={20} className="text-rose-300 mt-1" />
                <div>
                  <h4 className="font-medium text-rose-200">Suggested Category</h4>
                  <p className="text-rose-100">{formData.categoryToAdd}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-rose-300 mt-1" />
              <div>
                <h4 className="font-medium text-rose-200">Contact Info</h4>
                <p className="text-rose-100">{formData.email}</p>
                {formData.phoneNumber && <p className="text-rose-100/70">{formData.phoneNumber}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} className="text-rose-300 mt-1" />
              <div>
                <h4 className="font-medium text-rose-200">Communication Preference</h4>
                <p className="text-rose-100 capitalize">{formData.communicationPreference}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Star size={20} className="text-rose-300 mt-1" />
              <div>
                <h4 className="font-medium text-rose-200">Collector Status</h4>
                <p className="text-rose-100">
                  {formData.isReturningCollector ? "Returning Collector" : "New Collector"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p variants={itemVariants} className="text-rose-100/80">
        We'll be in touch soon with exciting collection opportunities!
      </motion.p>
    </motion.div>
  )
}
