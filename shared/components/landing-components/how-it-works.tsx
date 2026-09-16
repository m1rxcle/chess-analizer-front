"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AnimatedHowItWorks } from "./animated/animated-how-it-works"
gsap.registerPlugin(ScrollTrigger)

export const HowItWorksSection = () => {
	return <AnimatedHowItWorks />
}
