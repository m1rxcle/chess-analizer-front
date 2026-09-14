import { Header } from "@/shared/components/header"

export default function SearchLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="background text-primary">
			<Header />
			{children}
		</section>
	)
}
