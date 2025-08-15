"use client"

import { Card } from "@/components/ui/card"

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"

import useWindowResize from "@/hooks/use-window-resize"

import landingbg from "/assets/landingBG2.png"
import { useRef } from "react"

import SunriseBackground from '@/components/sunrise-background'
import Header from "@/components/header"

import steveAoki from "/assets/steve-aoki_banner.png"
import astroBoy from "/assets/astro-boy_banner.png"

const sections = [
    Mission,
    Mission2
]

export default function Ethos() {
    const scrollRef = useRef(null);
    const {size} = useWindowResize();

    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ["start start", "end end"] // start at the top of the page and end at the bottom of the page
    })

    const titleHeight = size.height * 1.2

    const sectiontimeline = sections.map((_, i) => {
        const start = titleHeight + i * size.height * 1.5
        const end = titleHeight + (i + 1) * size.height * 1.5

        return [start, end]
    })

    const timeline = [[0, titleHeight], ...sectiontimeline]

    const animation = timeline.map((data) => (
        {
            scale: useTransform(scrollYProgress, data, [1, 0.8])
        }
    ))

    return (
      <>
      <Header />
      <SunriseBackground />
      {/* Spacer to allow Hero animations to complete */}
      <div className="h-[400vh]" />
      <section ref={scrollRef} className="relative z-10">
        {/* <motion.div 
        style={{ scale: animation[0].scale, height: titleHeight }} 
        className="sticky top-0 flex items-end text-8xl lg:text-[160px] uppercase lg:leading-[140px] px-36 overflow-clip z-20 bg-white">
            <h1 className="w-full h-max">Stacking <br /> <span className="ml-20 lg:ml-52">Sections</span></h1>
        </motion.div> */}
        {sections.map((Section, index) => (
             <motion.div 
                 key={index} 
                 className="h-dvh sticky top-0 z-20"
                 style={animation[index]}
                 >
               <Card key={index} className="h-dvh">
                 <Section />
               </Card>
             </motion.div>
         ))}
        {/* <div className="h-dvh"/> */}
      </section>
      </>
    )
}

  function Mission() {
     return (
       <div 
       className="relative h-screen flex items-center justify-center px-6 bg-neutral-200 text-black"
       style={{backgroundImage:`url(${steveAoki})`}}
       >
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill="none" className="w-96 h-96">
            <path d="M 150,10 A 140,140 0 1,1 149.99,10" stroke="#E5E5DF" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <em className="text-sm uppercase tracking-wider text-orange-400 mb-4">Mission</em>
          <motion.h2 className="text-4xl md:text-6xl font-light leading-tight mb-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Lorem Ipsum PiggyBanx Collaboratorium
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <motion.p className="text-lg text-gray-900 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
            <span className="text-orange-400">PiggyBanx is a new kind of collectible art company.</span> lorem ipsum piggybanx collaboratorium lorem ipsum piggybanx collaboratorium. Our{" "}
            <span className="text-orange-400">intelligent, autonomous art cells</span> lorem ipsum piggybanx collaboratorium lorem ipsum piggybanx collaboratorium. and{" "}
            <span className="text-orange-400">empower artists</span> lorem ipsum piggybanx collaboratorium lorem ipsum piggybanx collaboratorium.
            </motion.p>
            <motion.button className="border border-orange-400 text-orange-400 px-6 py-3 rounded hover:bg-orange-400 hover:text-white transition-colors"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Read more
            </motion.button>
          </div>
        </div>
        <div className="h-dvh"/>
      </div>
    )
  }

  function Mission2() {
     return (
       <div 
       className="relative h-screen flex items-center justify-center px-6 bg-gradient-to-b from-slate-900 to-black text-white"
       style={{backgroundImage:`url(${astroBoy})`}}
       >
        <div className="container mx-auto text-center max-w-5xl">
          <motion.h3 
            className="text-4xl md:text-6xl lg:text-7xl font-light text-center mb-8"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            PiggyBanx Lorem Ipsum
          </motion.h3>
          
          <motion.p 
            className="text-xl md:text-2xl leading-relaxed opacity-90 font-light max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            lorem ipsum piggybanx collaboratorium lorem ipsum piggybanx collaboratorium 
            lorem ipsum piggybanx collaboratorium lorem ipsum piggybanx collaboratorium
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
              Explore Further
            </button>
          </motion.div>
        </div>
        <div className="h-dvh"/>
      </div>
    )
  }