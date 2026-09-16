import { AnimatedHero } from "./animated/animated-hero"
export const HeroSection = () => {
	return (
		<section id="hero" className="flex flex-col md:justify-center md:flex-row md:items-start gap-20 md:gap-6 min-h-screen scroll-mt-24">
			<AnimatedHero />
		</section>
	)
}
