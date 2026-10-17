import { Button } from "@/shared/ui/button"
import React from "react"

interface Props {
	handleShowAnalysis: () => void
	loadingAnalysis: boolean
}

export const MakeAnalysisButton: React.FC<Props> = ({ handleShowAnalysis, loadingAnalysis }) => {
	return (
		<Button
			onClick={handleShowAnalysis}
			disabled={loadingAnalysis}
			className="relative isolate overflow-hidden bg-accent text-primary text-xl px-8 py-6 w-full lg:px-10 lg:py-8 lg:text-2xl rounded-2xl cursor-pointer hover:bg-accent/50 disabled:opacity-80 disabled:cursor-not-allowed"
		>
			{loadingAnalysis && <span className="absolute inset-y-0 left-0 w-full origin-left animate-analysis-fill bg-neutral-500/40" />}

			<span className="relative z-10">{loadingAnalysis ? "Анализируется..." : "Показать анализ"}</span>
		</Button>
	)
}
