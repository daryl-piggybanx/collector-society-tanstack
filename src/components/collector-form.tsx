"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { getProfileByEmail, createUpdateProfile } from "@/integrations/klaviyo/profiles/services"
import { useMutation } from "@tanstack/react-query"
import { collectionPreferences, collectionRules, collectionVariations } from "@/lib/data"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import CollectorPieces from "@/components/phases/collector-pieces"
import CollectorType from "@/components/phases/collector-type"
import CollectorReasons from "@/components/phases/collector-reasons"
import CommunityExperience from "@/components/phases/community-experience"
import CommunityRules from "@/components/phases/community-rules"
import MarketingConsent from "@/components/phases/marketing-consent"
import NewCategories from "@/components/phases/new-categories"
import TopCategories from "@/components/phases/top-categories"
import UserIdentity from "@/components/phases/user-identity"

import SuccessPage from "@/components/phases/success-page"

export type FormData = {
  isReturningCollector: boolean
  rulesAccepted: boolean[]
  firstName: string
  lastName: string
  created?: string
  updated: string
  discordUsername?: string
  instagramHandle?: string
  collectionReason?: string
  interests?: string
  email: string
  phoneNumber?: string
  communicationPreference?: string
  marketingConsent: boolean
  pieceCount?: string
  firstPiece?: string
  favoriteVariation?: string
  collectPreferences?: string[]
  categoryToAdd?: string
  communityExperience?: string
  improvements?: string
}

const initialFormData: FormData = {
  isReturningCollector: false,
  rulesAccepted: [false, false, false, false],
  firstName: "",
  lastName: "",
  created: "",
  updated: "",
  discordUsername: "",
  instagramHandle: "",
  collectionReason: "",
  interests: "",
  email: "",
  phoneNumber: "",
  communicationPreference: "",
  marketingConsent: false,
  pieceCount: "",
  firstPiece: "",
  favoriteVariation: "",
  collectPreferences: [],
  categoryToAdd: "",
  communityExperience: "",
  improvements: "",
}

export function NewCollectorForm() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const mutation = useMutation({
    mutationFn: createUpdateProfile,
    onSuccess: () => {
      console.log("Profile created/updated successfully")
    },
    onError: (error) => {
      console.error("Error creating/updating profile:", error)
    },
  })

  const totalPhases = 5;
 
  const progressPercentage = (currentPhase / totalPhases) * 100

  const handleNext = () => {
    setCurrentPhase((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentPhase((prev) => prev - 1)
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    formData.created = new Date().toISOString()
    formData.updated = new Date().toISOString();

    const transformedData = {
      email: formData.email,
      phone_number: formData.phoneNumber,
      first_name: formData.firstName,
      last_name: formData.lastName,
      created: formData.created,
      updated: formData.updated,
      marketing_consent: formData.marketingConsent,
      discord_username: formData.discordUsername,
      piece_count: formData.pieceCount,
      favorite_variation: formData.favoriteVariation,
      collect_preferences: formData.collectPreferences,
      communication_preference: formData.communicationPreference,
      instagram_handle: formData.instagramHandle,
      collection_reason: formData.collectionReason,
      interests: formData.interests,
      first_piece: formData.firstPiece,
      community_experience: formData.communityExperience,
      improvements: formData.improvements
    };

    console.log('test payload to service: ', transformedData);

    try {
      await mutation.mutateAsync({ data: transformedData });
      setIsComplete(true);
      setCurrentPhase(totalPhases + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Determine if the next button should be disabled
  const isNextDisabled = () => {
    switch (currentPhase) {
      case 1:
        return !formData.rulesAccepted.every((rule) => rule)
      case 2:
        return !formData.firstName || !formData.lastName
      case 3:
        return !formData.collectionReason || !formData.interests
      case 4:
        return !formData.email
      case 5:
        return formData.collectPreferences.length === 0
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <motion.div
        className="bg-rose-950/30 backdrop-blur-sm border border-rose-400/20 rounded-2xl shadow-xl overflow-hidden relative pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 min-h-[500px]">
          <AnimatePresence mode="wait">

            {currentPhase === 1 && (
              <CommunityRules
                key="community-rules"
                formData={formData}
                updateFormData={updateFormData}
                rules={collectionRules}
              />
            )}

            {currentPhase === 2 && (
              <>
                <UserIdentity key="user-identity" formData={formData} updateFormData={updateFormData} />
              </>

            )}


            {currentPhase === 3 && (
              <>
                <CollectorReasons key="collector-reasons" formData={formData} updateFormData={updateFormData} />
              </>

            )}

            {currentPhase === 4 && (
              <>
                <MarketingConsent key="marketing-consent" formData={formData} updateFormData={updateFormData} />
              </>

            )}


            {currentPhase === 5 && (
              <TopCategories
                key="top-categories"
                formData={formData}
                updateFormData={updateFormData}
                preferences={collectionPreferences}
              />
            )}

            {isComplete && currentPhase === totalPhases + 1 && (
              <SuccessPage
                key="success"
                formData={formData}
                preferences={collectionPreferences}
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

export function OGCollectorForm() {
  const [currentPhase, setCurrentPhase] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const mutation = useMutation({
    mutationFn: createUpdateProfile,
    onSuccess: () => {
      console.log("Profile created/updated successfully")
    },
    onError: (error) => {
      console.error("Error creating/updating profile:", error)
    },
  })

  const totalPhases = 4;

  const progressPercentage = (currentPhase / totalPhases) * 100

  const handleNext = () => {
    setCurrentPhase((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentPhase((prev) => prev - 1)
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    formData.updated = new Date().toISOString()

    const transformedData = {
      email: formData.email,
      phone_number: formData.phoneNumber,
      first_name: formData.firstName,
      last_name: formData.lastName,
      created: formData.created,
      updated: formData.updated,
      marketing_consent: formData.marketingConsent,
      discord_username: formData.discordUsername,
      piece_count: formData.pieceCount,
      favorite_variation: formData.favoriteVariation,
      collect_preferences: formData.collectPreferences,
      communication_preference: formData.communicationPreference,
      instagram_handle: formData.instagramHandle,
      collection_reason: formData.collectionReason,
      interests: formData.interests,
      first_piece: formData.firstPiece,
      community_experience: formData.communityExperience,
      improvements: formData.improvements
    };

    try {
      await mutation.mutateAsync({ data: transformedData });
      setIsComplete(true);
      setCurrentPhase(totalPhases + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if the next button should be disabled
  const isNextDisabled = () => {
    switch (currentPhase) {
      case 1:
        return !formData.firstName || !formData.lastName || !formData.discordUsername
      case 2:
        return !formData.pieceCount
      case 3:
        return formData.collectPreferences.length === 0
      case 4:
        return !formData.communityExperience || !formData.improvements
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
              <UserIdentity key="user-identity" formData={formData} updateFormData={updateFormData} />
            )}

            {currentPhase === 2 && (
              <CollectorPieces
                key="collector-pieces"
                formData={formData}
                updateFormData={updateFormData}
                variations={collectionVariations}
              />
            )}

            {currentPhase === 3 && (
              <TopCategories
                key="top-categories"
                formData={formData}
                updateFormData={updateFormData}
                preferences={collectionPreferences}
              />
            )}

            {currentPhase === 4 && (
              <CommunityExperience
                key="community-experience"
                formData={formData}
                updateFormData={updateFormData}
              />
            )}

            {isComplete && currentPhase === totalPhases + 1 && (
              <SuccessPage
                key="success"
                formData={formData}
                preferences={collectionPreferences}
                variations={collectionVariations}
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
