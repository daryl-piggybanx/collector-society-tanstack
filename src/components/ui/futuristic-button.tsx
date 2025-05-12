"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, Home, Users, UserPlus, ExternalLink } from "lucide-react"

type ButtonColor = "red"
type ButtonIcon = "rocket" | "home" | "scroll" | "user-plus"

interface FuturisticButtonProps {
  label: string
  color: ButtonColor
  icon: ButtonIcon
  href: string
}

const colorMap = {
  red: {
    bg: "bg-red-600/20",
    border: "border-red-600/50",
    text: "text-red-500",
    glow: "shadow-red-500/20",
    hoverBg: "group-hover:bg-red-600/30",
    hoverBorder: "group-hover:border-red-500",
    hoverGlow: "group-hover:shadow-red-500/40",
    activeBg: "active:bg-red-700/40",
  },
}

const iconMap = {
  rocket: Package,
  home: Home,
  scroll: Users,
  "user-plus": UserPlus,
}

export default function FuturisticButton({ label, color, icon, href }: FuturisticButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const styles = colorMap.red // Always use red color scheme
  const IconComponent = iconMap[icon]

  return (
    <motion.div
      className="perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <a href={href} className="block">
        <div
          className={`group relative flex h-14 w-full items-center justify-between gap-3 overflow-hidden rounded-lg border px-4 py-3 backdrop-blur-sm transition-all duration-300 sm:w-auto sm:min-w-[180px] 
            ${styles.bg} ${styles.border} ${styles.glow} ${styles.hoverBg} ${styles.hoverBorder} ${styles.hoverGlow} ${styles.activeBg}
            shadow-lg hover:shadow-xl`}
        >
          {/* Background glow effect */}
          <div
            className={`absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70 ${styles.bg}`}
          ></div>

          {/* Icon */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${styles.bg} transition-colors duration-300 ${styles.text} group-hover:text-white`}
          >
            <IconComponent size={18} />
          </div>

          {/* Label */}
          <span className="flex-1 text-sm font-medium text-stone-300 transition-colors duration-300 group-hover:text-white sm:text-base">
            {label}
          </span>

          {/* Arrow indicator */}
          <motion.div
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`${styles.text} transition-colors duration-300 group-hover:text-white`}
          >
            <ExternalLink size={16} />
          </motion.div>

          {/* Pulse effect on hover */}
          {isHovered && (
            <motion.div
              className={`absolute inset-0 rounded-lg ${styles.border}`}
              initial={{ opacity: 0.8, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>
      </a>
    </motion.div>
  )
}
