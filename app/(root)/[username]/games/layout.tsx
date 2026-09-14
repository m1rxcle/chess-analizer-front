import { Header } from "@/shared/components/header"

export default function GamesLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Header isHomePage={false} />
			{children}
		</section>
	)
}
