import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"
import { Toaster } from "../ui/toast"

export default function Provider({ children }: React.PropsWithChildren) {
	return (
		<NuqsAdapter>
			{children}
			<Toaster />
		</NuqsAdapter>
	)
}
