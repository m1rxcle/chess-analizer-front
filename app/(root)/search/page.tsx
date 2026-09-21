import { Search } from "@/shared/components/search-page/search"
import { Suspense } from "react"

export default function SearchPage() {
	return (
		<Suspense fallback={null}>
			<Search />
		</Suspense>
	)
}
