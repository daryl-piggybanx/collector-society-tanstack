"use client"

import FuturisticButton from "@/components/ui/futuristic-button"
import { useMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"


export default function ActionButtons() {
  const isMobile = useMobile()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <motion.div
      className={`${isMobile ? "grid grid-cols-2 gap-3" : "flex flex-row flex-wrap"} justify-center gap-4 pt-6`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FuturisticButton label="Drop Site" color="red" icon="rocket" href="https://www.piggybanxinc.com/" />
      <FuturisticButton label="Club House" color="red" icon="home" href="https://www.piggybanx.com/" />
      <FuturisticButton label="Returning Collector Form" color="red" icon="scroll" href="/collector/og" />
      <FuturisticButton label="New Collector Application" color="red" icon="user-plus" href="/collector/new" />
    </motion.div>
  )
}