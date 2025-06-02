"use client"

import type React from "react"

import { useState, useRef } from "react"

interface HolographicCardProps {
  imageSrc: string
  imageAlt: string
}

export default function HolographicCard({ imageSrc, imageAlt }: HolographicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const getTransform = () => {
    if (!cardRef.current || !isHovered) return "perspective(1000px) rotateX(0deg) rotateY(0deg)"

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (mousePosition.y - centerY) / 10
    const rotateY = (centerX - mousePosition.x) / 10

    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  }

  const getGradientStyle = () => {
    if (!cardRef.current || !isHovered) return {}

    const rect = cardRef.current.getBoundingClientRect()
    const x = (mousePosition.x / rect.width) * 100
    const y = (mousePosition.y / rect.height) * 100

    return {
      background: `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 0.4) 20%,
          rgba(255, 255, 255, 0.1) 40%,
          transparent 70%
        ),
        linear-gradient(
          ${x * 3.6}deg,
          transparent 30%,
          rgba(255, 0, 150, 0.3) 40%,
          rgba(0, 255, 255, 0.3) 50%,
          rgba(255, 255, 0, 0.3) 60%,
          transparent 70%
        ),
        linear-gradient(
          ${90 + x * 1.8}deg,
          transparent 20%,
          rgba(255, 100, 0, 0.2) 40%,
          rgba(100, 255, 100, 0.2) 60%,
          transparent 80%
        )
      `,
      opacity: isHovered ? 1 : 0,
    }
  }

  const getShineStyle = () => {
    if (!cardRef.current || !isHovered) return {}

    const rect = cardRef.current.getBoundingClientRect()
    const x = (mousePosition.x / rect.width) * 100
    const y = (mousePosition.y / rect.height) * 100

    return {
      background: `linear-gradient(${x * 2}deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)`,
      opacity: isHovered ? 0.6 : 0,
      transform: `translateX(${(x - 50) * 0.5}px) translateY(${(y - 50) * 0.5}px)`,
    }
  }

  return (
    <div className="relative">
      <div
        ref={cardRef}
        className="relative w-80 h-[480px] cursor-pointer transition-all duration-300 ease-out"
        style={{
          transform: getTransform(),
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main card */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          {/* Card image */}
          <img src={imageSrc || "/placeholder.svg"} alt={imageAlt} className="w-full h-full object-cover" />

          {/* Holographic overlay */}
          <div
            className="absolute inset-0 rounded-2xl transition-opacity duration-300 mix-blend-overlay"
            style={getGradientStyle()}
          />

          {/* Shine effect */}
          <div
            className="absolute inset-0 rounded-2xl transition-all duration-300 mix-blend-soft-light"
            style={getShineStyle()}
          />

          {/* Rainbow gradient overlay */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              isHovered ? "opacity-30" : "opacity-0"
            }`}
            style={{
              background: `
                conic-gradient(
                  from ${mousePosition.x * 0.5}deg,
                  #ff0080,
                  #ff8000,
                  #ffff00,
                  #80ff00,
                  #00ff80,
                  #00ffff,
                  #0080ff,
                  #8000ff,
                  #ff0080
                )
              `,
              mixBlendMode: "color-dodge",
            }}
          />

          {/* Prismatic effect */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              isHovered ? "opacity-20" : "opacity-0"
            }`}
            style={{
              background: `
                repeating-linear-gradient(
                  ${mousePosition.x * 0.1}deg,
                  transparent,
                  rgba(255, 255, 255, 0.1) 1px,
                  transparent 2px,
                  rgba(255, 0, 255, 0.1) 3px,
                  transparent 4px
                )
              `,
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 -z-10 ${
            isHovered ? "opacity-60" : "opacity-0"
          }`}
          style={{
            background: `
              radial-gradient(
                circle at ${(mousePosition.x / (cardRef.current?.getBoundingClientRect().width || 1)) * 100}% ${(mousePosition.y / (cardRef.current?.getBoundingClientRect().height || 1)) * 100}%,
                rgba(255, 100, 255, 0.4) 0%,
                rgba(100, 255, 255, 0.3) 30%,
                rgba(255, 255, 100, 0.2) 60%,
                transparent 100%
              )
            `,
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      </div>
    </div>
  )
}
