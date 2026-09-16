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
			className="bg-accent text-primary text-xl px-8 py-6 w-1/2 lg:px-10 lg:py-8 lg:text-2xl rounded-2xl cursor-pointer hover:bg-accent/50 lg:w-full"
		>
			{loadingAnalysis ? "Анализируется..." : "Показать анализ"}
		</Button>
	)
}
