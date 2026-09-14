import { Button } from "@/shared/ui/button"
import React from "react"

interface Props {
	handleShowAnalysis: () => void
	loadingAnalysis: boolean
}

export const MakeAnalysisButton: React.FC<Props> = ({ handleShowAnalysis, loadingAnalysis }) => {
	return (
		<Button onClick={handleShowAnalysis} className="bg-accent text-primary px-10 py-8 text-2xl rounded-2xl cursor-pointer hover:bg-accent/50 w-full">
			{loadingAnalysis ? "Анализируется..." : "Показать анализ"}
		</Button>
	)
}
