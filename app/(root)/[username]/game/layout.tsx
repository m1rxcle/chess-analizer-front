import { Header } from "@/shared/components/header"

export default function GameLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Header isHomePage={false} />
			{children}
		</section>
	)
}
