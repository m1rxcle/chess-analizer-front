"use client"

import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { Play } from "lucide-react"
import { Button } from "../../ui/button"
import { TitleBadge } from "../title-badge"
import { FindPlayerButton } from "./find-player-button"
import { HeroImage } from "./hero-image"
export const HeroSection = () => {
	useGSAP(() => {
		gsap.from("#hero", { y: 100, opacity: 0, duration: 1, ease: "power2.out" })
	})

	return (
		<section id="hero" className="flex flex-col md:justify-center md:flex-row md:items-start gap-20 md:gap-6 min-h-screen scroll-mt-24">
			<div className="mx-5 space-y-10 md:ml-10 md:mt-10 md:w-1/2 overflow-hidden">
				<TitleBadge text="Бесплатный анализ партий с Chess.com" />
				<div className="space-y-2">
					<h1 className="text-4xl  lg:text-7xl font-bold text-center md:text-left">
						Анализируйте свои <span className="text-accent">шахматные</span> партии
					</h1>
					<p className="text-secondary text-lg text-center md:text-left lg:text-2xl ">
						Получайте детальный анализ с помощью Stockfish. Узнавайте свои ошибки, улучшайте игру и побеждайте.
					</p>
				</div>
				<div className="flex flex-col gap-2 lg:flex-row">
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
			<HeroImage />
		</section>
	)
}
