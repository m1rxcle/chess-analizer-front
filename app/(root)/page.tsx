import { Header } from "@/shared/components/header"
import { FeaturesSection } from "@/shared/components/landing-components/features"
import { Footer } from "@/shared/components/landing-components/footer"
import { HeroSection } from "@/shared/components/landing-components/hero"
import { HowItWorksSection } from "@/shared/components/landing-components/how-it-works"

export default function HomePage() {
	return (
		<section>
			<Header isHomePage={true} />
			<main>
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
			</main>
			<Footer />
		</section>
	)
}
