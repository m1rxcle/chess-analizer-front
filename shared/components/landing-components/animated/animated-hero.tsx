"use client"

import { Button } from "@/shared/ui/button"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Play } from "lucide-react"
import { TitleBadge } from "../../title-badge"
import { FindPlayerButton } from "../find-player-button"
import { HeroImage } from "../hero-image"

export const AnimatedHero = () => {
	useGSAP(() => {
		gsap.from("#left-content .hero-item", { x: -100, opacity: 0, duration: 1, ease: "power2.out", stagger: 0.2 })
		gsap.from("#hero-image", { opacity: 0.2, duration: 1.5, ease: "power2.out" })
	})

	return (
		<>
			<div id="left-content" className=" mx-5 space-y-10 md:ml-10 md:mt-10 md:w-1/2 overflow-hidden">
				<TitleBadge className="hero-item" text="Бесплатный анализ партий с Chess.com" />
				<div className="space-y-2 ">
					<h1 className="text-4xl  lg:text-7xl font-bold text-center md:text-left hero-item">
						Анализируйте свои <span className="text-accent">шахматные</span> партии
					</h1>
					<p className="text-secondary text-lg text-center md:text-left lg:text-2xl hero-item">
						Получайте детальный анализ с помощью Stockfish. Узнавайте свои ошибки, улучшайте игру и побеждайте.
					</p>
				</div>
				<div className="flex flex-col gap-2 lg:flex-row hero-item">
					<FindPlayerButton />
					<a href="#how-it-works">
						<Button
							variant="ghost"
							className="rounded-2xl py-8 px-10 border border-white/30 cursor-pointer hover:text-accent transition-colors duration-300 ease-in-out w-full"
						>
							<Play />
							<span className="text-md md:text-lg lg:text-xl">Как это работает</span>
						</Button>
					</a>
				</div>
			</div>
			<HeroImage id="hero-image" />
		</>
	)
}
