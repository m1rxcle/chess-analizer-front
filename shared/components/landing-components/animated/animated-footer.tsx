"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { FindPlayerButton } from "../find-player-button"
gsap.registerPlugin(ScrollTrigger)
export const AnimatedFooter = () => {
	useGSAP(() => {
		gsap.from(".footer-item", {
			x: -100,
			opacity: 0,
			duration: 1.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#footer",
				start: "top 90%",
			},
			stagger: 0.2,
		})

		gsap.from(".footer-img", {
			x: -100,
			opacity: 0,
			duration: 1.2,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#footer",
				start: "top 90%",
			},
		})
	})

	return (
		<footer
			id="footer"
			className="relative mt-30 flex flex-col justify-between py-10 lg:py-0 lg:flex-row items-center h-100 lg:h-60 lg:justify-end gap-10 glass-effect mx-5 md:mx-10 rounded-3xl px-8 mb-20"
		>
			<div className="hidden lg:block absolute -top-34 left-1/2 rotate-.5 select-none pointer-events-none  z-10">
				<Image className="footer-img" loading="lazy" src="/footer-pic1.png" alt="footer-pic" width={500} height={500} />
			</div>

			<div className="space-y-4 relative z-20  text-center md:text-left lg:mr-auto max-w-2xl">
				<h1 className="text-3xl md:text-4xl font-bold footer-item">Готовы улучшить свою игру?</h1>
				<p className="text-xl font-semibold text-secondary footer-item">Присоединяйтесь к тысячам шахматистов, которые уже анализируют свои партии</p>
			</div>
			<FindPlayerButton className="footer-button" />
			<div className="lg:hidden absolute bottom-0 -left-5 rotate-0 select-none pointer-events-none -z-10 opacity-70">
				<Image
					className="footer-img"
					loading="lazy"
					sizes="(max-width: 768px) 100vw, 50vw"
					src="/footer-pic1.png"
					alt="footer-pic"
					width={200}
					height={200}
				/>
			</div>
		</footer>
	)
}
