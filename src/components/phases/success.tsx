import React from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  User,
  MessageSquare,
  Mail,
  Star,
  Sparkles,
  Gem,
  Flame,
  Music,
  Gamepad,
  Car,
  Film,
  Users,
  Tv,
} from "lucide-react"

// Map variation names to icons
const variationIcons: Record<string, any> = {
  Prism: Sparkles,
  Radiant: Star,
  Disco: Flame,
  Fractal: Gem,
}

// Map category names to icons
const categoryIcons: Record<string, any> = {
  "Modern Sports/Athletes": Users,
  Music: Music,
  "Star Wars": Star,
  "Video Games": Gamepad,
  "Pop Culture": Tv,
  Anime: Film,
  "Cars/Racing": Car,
}

const Success = ({ formData }) => {
  return (
    <div className="p-8 py-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-20" />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2,
        }}
        className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 z-10"
      >
        <CheckCircle size={48} className="text-green-600" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-center mb-3 text-[#23384F] z-10"
      >
        Thank You!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center text-gray-600 max-w-md mb-8 z-10"
      >
        Your information has been successfully submitted. We'll be in touch soon!
      </motion.p>

      {/* Character Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm p-6 z-10"
      >
        <h3 className="text-xl font-bold text-[#23384F] mb-4 border-b pb-2">Collector Profile</h3>

        <div className="space-y-4">
          {/* Personal Info */}
          <div className="flex items-start gap-3">
            <User className="text-[#23384F] mt-1" size={20} />
            <div>
              <h4 className="font-medium text-gray-700">Personal Information</h4>
              <p className="text-gray-600">
                {formData.firstName} {formData.lastName}
              </p>
              <p className="text-gray-600">Discord: {formData.discordUsername}</p>
              <p className="text-gray-600 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#23384F]/10 text-[#23384F]">
                  {formData.isReturningCollector ? "Returning Collector" : "New Collector"}
                </span>
              </p>
            </div>
          </div>

          {/* Collection Info - Only show for returning collectors */}
          {formData.isReturningCollector && formData.pieceCount && (
            <div className="flex items-start gap-3">
              <Star className="text-[#23384F] mt-1" size={20} />
              <div>
                <h4 className="font-medium text-gray-700">Collection Details</h4>
                <p className="text-gray-600">Pieces: {formData.pieceCount}</p>
                {formData.favoriteVariation && (
                  <div className="mt-1">
                    <p className="text-gray-600">Favorite Variation:</p>
                    <div className="flex items-center gap-1 mt-1">
                      {variationIcons[formData.favoriteVariation] &&
                        React.createElement(variationIcons[formData.favoriteVariation], {
                          size: 16,
                          className: "text-[#23384F]",
                        })}
                      <span className="text-[#23384F] font-medium">{formData.favoriteVariation}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Want to Collect */}
          <div className="flex items-start gap-3">
            <Sparkles className="text-[#23384F] mt-1" size={20} />
            <div>
              <h4 className="font-medium text-gray-700">Want to Collect</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.collectWants.map((category, index) => (
                  <div
                    key={category}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-[#23384F]/10 text-[#23384F]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#23384F] text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Wanted */}
          <div className="flex items-start gap-3">
            <MessageSquare className="text-[#23384F] mt-1" size={20} />
            <div>
              <h4 className="font-medium text-gray-700">Category Suggestion</h4>
              <p className="text-gray-600">{formData.categoryWanted}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex items-start gap-3">
            <Mail className="text-[#23384F] mt-1" size={20} />
            <div>
              <h4 className="font-medium text-gray-700">Contact Information</h4>
              <p className="text-gray-600">{formData.email}</p>
              <p className="text-gray-600">{formData.phoneNumber}</p>
              <p className="text-gray-600">Preferred contact: {formData.communicationPreference}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Success
