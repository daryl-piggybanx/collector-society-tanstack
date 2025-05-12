"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import CollectorType from "@/components/phases/collector-type"
import CommunityRules from "@/components/phases/community-rules"
import UserIdentity from "@/components/phases/user-identity"
import CollectorPieces from "@/components/phases/collector-pieces"
import TopCategories from "@/components/phases/top-categories"
import NewCategories from "@/components/phases/new-categories"
import MarketingConsent from "@/components/phases/marketing-consent"
import SuccessPage from "@/components/phases/success-page"

export type FormData = {
  isReturningCollector: boolean | null
  rulesAccepted: boolean[]
  firstName: string
  lastName: string
  discordUsername: string
  pieceCount: string
  favoriteVariation: string
  collectPreferences: string[]
  categoryToAdd: string
  email: string
  phoneNumber: string
  communicationPreference: string
}

const initialFormData: FormData = {
  isReturningCollector: null,
  rulesAccepted: [false, false, false, false],
  firstName: "",
  lastName: "",
  discordUsername: "",
  pieceCount: "",
  favoriteVariation: "",
  collectPreferences: [],
  categoryToAdd: "",
  email: "",
  phoneNumber: "",
  communicationPreference: "",
}

// Mock rules for the form
const collectionRules = [
  "I agree to follow all community guidelines",
  "I understand that all trades are final",
  "I will report any suspicious activity to moderators",
  "I will maintain respectful communication with other collectors",
]

// Mock variations for the form
const variations = ["Prism", "Radiant", "Disco", "Fractal"]

// Mock collection preferences
const collectionPreferences = [
  { name: "Modern Sports/Athletes", icon: "trophy" },
  { name: "Music", icon: "music" },
  { name: "Star Wars", icon: "sparkles" },
  { name: "Video Games", icon: "gamepad-2" },
  { name: "Pop Culture", icon: "film" },
  { name: "Anime", icon: "palette" },
  { name: "Cars/Racing", icon: "car" },
]

export default function CollectorForm() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Calculate total phases based on user type
  const totalPhases = formData.isReturningCollector === false ? 7 : 7

  // Calculate progress percentage
  const progressPercentage = (currentPhase / totalPhases) * 100

  const handleNext = () => {
    // Skip phase 4 for new collectors
    if (currentPhase === 3 && formData.isReturningCollector === false) {
      setCurrentPhase(5)
    } else {
      setCurrentPhase((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    // Handle skipping phase 4 when going back for new collectors
    if (currentPhase === 5 && formData.isReturningCollector === false) {
      setCurrentPhase(3)
    } else {
      setCurrentPhase((prev) => prev - 1)
    }
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call to Klaviyo
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, you would send the data to Klaviyo here
      console.log("Form data submitted:", formData)

      setIsComplete(true)
      setCurrentPhase(totalPhases + 1)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine if the next button should be disabled
  const isNextDisabled = () => {
    switch (currentPhase) {
      case 1:
        return formData.isReturningCollector === null
      case 2:
        return !formData.rulesAccepted.every((rule) => rule)
      case 3:
        return !formData.firstName || !formData.lastName || !formData.discordUsername
      case 4:
        return !formData.pieceCount
      case 5:
        return formData.collectPreferences.length === 0
      case 6:
        return false // Category to add is optional
      case 7:
        return !formData.email || !formData.communicationPreference
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <motion.div
        className="bg-rose-950/30 backdrop-blur-sm border border-rose-400/20 rounded-2xl shadow-xl overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {currentPhase === 1 && (
              <CollectorType key="collector-type" formData={formData} updateFormData={updateFormData} />
            )}

            {currentPhase === 2 && (
              <CommunityRules
                key="community-rules"
                formData={formData}
                updateFormData={updateFormData}
                rules={collectionRules}
              />
            )}

            {currentPhase === 3 && (
              <UserIdentity key="user-identity" formData={formData} updateFormData={updateFormData} />
            )}

            {currentPhase === 4 && formData.isReturningCollector && (
              <CollectorPieces
                key="collector-pieces"
                formData={formData}
                updateFormData={updateFormData}
                variations={variations}
              />
            )}

            {currentPhase === 5 && (
              <TopCategories
                key="top-categories"
                formData={formData}
                updateFormData={updateFormData}
                preferences={collectionPreferences}
              />
            )}

            {currentPhase === 6 && (
              <NewCategories key="new-categories" formData={formData} updateFormData={updateFormData} />
            )}

            {currentPhase === 7 && (
              <MarketingConsent
                key="marketing-consent"
                formData={formData}
                updateFormData={updateFormData}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}

            {isComplete && currentPhase === totalPhases + 1 && (
              <SuccessPage
                key="success"
                formData={formData}
                preferences={collectionPreferences}
                variations={variations}
              />
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          {!isComplete && (
            <div className="flex justify-between mt-8">
              {currentPhase > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-2 bg-rose-950/40 border-rose-400/30 text-rose-100 hover:bg-rose-800/50 hover:text-rose-50"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
              )}

              {currentPhase < totalPhases && (
                <Button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className="ml-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-rose-50"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              )}

              {currentPhase === totalPhases && (
                <Button
                  onClick={handleSubmit}
                  disabled={isNextDisabled() || isSubmitting}
                  className="ml-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-rose-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit
                      <Check size={16} />
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {!isComplete && (
          <div className="px-8 pb-6">
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-rose-200/80 mt-2">
              Step {currentPhase} of {totalPhases}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
