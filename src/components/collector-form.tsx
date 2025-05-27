"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { getProfileByEmail, createUpdateProfile } from "@/integrations/klaviyo/profiles/services"
import type { KlaviyoProfile } from "@/integrations/klaviyo/profiles/types"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { collectionPreferences, collectionRules, collectionVariations } from "@/lib/data"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import { useSharedFormData } from "@/hooks/shared-data"

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
import { validatePhoneNumber } from "@/utils/validation"
import { validateEmail } from "@/utils/validation"

export type FormData = {
  is_returning_collector: boolean
  rules_accepted: boolean[]
  first_name: string
  last_name: string
  discord_username?: string
  instagram_handle?: string
  collection_reason?: string
  interests?: string
  email: string
  phone_number?: string
  communication_preference?: string
  marketing_consent: boolean
  piece_count?: string
  first_piece?: string
  favorite_variation?: string
  collect_preferences?: string[] | undefined
  category_to_add?: string
  community_experience?: string
  improvements?: string
}

const initialFormData: FormData = {
  is_returning_collector: false,
  rules_accepted: [false, false, false, false],
  first_name: "",
  last_name: "",
  discord_username: "",
  instagram_handle: "",
  collection_reason: "",
  interests: "",
  email: "",
  phone_number: "",
  communication_preference: "",
  marketing_consent: false,
  piece_count: "",
  first_piece: "",
  favorite_variation: "",
  collect_preferences: [],
  category_to_add: "",
  community_experience: "",
  improvements: "",
}

export function NewCollectorForm() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { setSharedData } = useSharedFormData();

  const mutation = useMutation({
    mutationFn: createUpdateProfile,
    onSuccess: (data) => {
      // console.log("Profile created/updated successfully")
      // queryClient.invalidateQueries({ queryKey: ['profile', formData.email] });
      // queryClient.setQueryData(['profile', formData.email], data);
      setSharedData(formData);
    },
    onError: (error) => {
      console.error("Error creating/updating profile:", error)
    },
  });

  const totalPhases = 5;
  const progressPercentage = (currentPhase / totalPhases) * 100;

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

    try {
      await mutation.mutateAsync({ data: formData });
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
        return !formData.rules_accepted.every((rule) => rule)
      case 2:
        return !formData.first_name || !formData.last_name
      case 3:
        return !formData.collection_reason || !formData.interests
      case 4:
        const emailValidation = validateEmail(formData.email);
        const phoneValidation = validatePhoneNumber(formData.phone_number || "");
        return !emailValidation.isValid || !phoneValidation.isValid
      case 5:
        return formData.collect_preferences && formData.collect_preferences.length === 0
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

// const OGFormData: FormData = {
//   ...initialFormData,
//   is_returning_collector: true
// }
const createInitialOGFormData = (sharedData: FormData | null): FormData => {
  const baseData: FormData = {
    ...initialFormData,
    is_returning_collector: true
  };

  if (!sharedData) {
    return baseData;
  }

  // simple merge - sharedData overwrites baseData properties
  return {
    ...baseData,
    ...sharedData,
    is_returning_collector: true
  };
};

export function OGCollectorForm() {
  const { sharedData, hasSharedData } = useSharedFormData();
  const [formData, setFormData] = useState<FormData>(() => createInitialOGFormData(sharedData as FormData | null));

  const [currentPhase, setCurrentPhase] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }


  const mutation = useMutation({
    mutationFn: createUpdateProfile,
    onSuccess: () => {
      // console.log("Profile created/updated successfully")
    },
    onError: (error) => {
      console.error("Error creating/updating profile:", error)
    },
  });

  const totalPhases = 4;
  const progressPercentage = (currentPhase / totalPhases) * 100

  const handleNext = () => {
    setCurrentPhase((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentPhase((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await mutation.mutateAsync({ data: formData });
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
        return !formData.first_name || !formData.last_name
      case 2:
        return !formData.piece_count
      case 3:
        return formData.collect_preferences && formData.collect_preferences.length === 0
      case 4:
        return !formData.community_experience || !formData.improvements
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
              <>
                <UserIdentity key="user-identity" formData={formData} updateFormData={updateFormData} />
                <MarketingConsent key="marketing-consent" formData={formData} updateFormData={updateFormData} />
              </>
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
                  className="ml-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-rose-50 cursor-pointer"
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              )}

              {currentPhase === totalPhases && (
                <Button
                  onClick={handleSubmit}
                  disabled={isNextDisabled() || isSubmitting}
                  className="ml-auto flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-rose-50 cursor-pointer"
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
