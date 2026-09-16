"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChartNoAxesCombined, FastForward, Gamepad2, Infinity, Target } from "lucide-react"
gsap.registerPlugin(ScrollTrigger)
export const AnimatedFeatures = () => {
	useGSAP(() => {
		gsap.from("#about", {
			y: 100,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#about",
				start: "top 90%",
			},
		})

		gsap.from(".about-item", {
			y: 50,
			opacity: 0,
			duration: 1,
			ease: "power2.out",
			scrollTrigger: {
				trigger: "#about",
				start: "top 90%",
			},
			stagger: 0.2,
		})
	})

	return (
		<section id="about" className="mb-40 scroll-mt-24">
			<div className="flex flex-col items-center gap-5 justify-around lg:flex-row lg:items-start glass-effect mx-5 lg:mx-10 rounded-3xl py-10 px-8">
				<div className="flex items-start gap-2 about-item">
					<Gamepad2 className="text-accent size-10" />
					<div className="flex flex-col justify-between gap-5">
						<Infinity className="size-10" />
						<div className="text-secondary text-md">
							<p>Бесплатный анализ</p>
							<span className="text-sm">Сколько угодно партий</span>
						</div>
					</div>
				</div>
				<div className="h-20 w-px bg-accent/50" />

				<div className="flex items-start gap-2 about-item">
					<ChartNoAxesCombined className="text-accent size-10" />
					<div className="flex flex-col justify-between gap-5">
						<h1 className="text-2xl font-bold">Stockfish 16</h1>
						<div className="text-secondary text-md">
							<p>Мощный движок</p>
							<span className="text-sm">Профессиональный анализ</span>
						</div>
					</div>
				</div>
				<div className="h-20 w-px bg-accent/50" />

				<div className="flex items-start  gap-2 about-item">
					<Target className="text-accent size-10" />
					<div className="flex flex-col justify-between gap-5">
						<h1 className="text-2xl font-bold">Детальная статистика</h1>
						<div className="text-secondary text-md">
							<p>Ошибок, неточности</p>
							<span className="text-sm">и лучшие ходы</span>
						</div>
					</div>
				</div>
				<div className="h-20 w-px bg-accent/50" />

				<div className="flex items-start gap-2 about-item">
					<FastForward className="text-accent size-10" />
					<div className="flex flex-col justify-between gap-5">
						<h1 className="text-2xl font-bold">Быстрый анализ</h1>
						<div className="text-secondary text-md">
							<p>Результат за</p>
							<span className="text-sm">несколько секунд</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
