import { formatAnalysis } from "@/shared/utils/format-analysis"
import type { TAnalyzeMoves } from "@/types/analyze-moves.type"
import React from "react"

interface Props {
	whitePlayer: string
	blackPlayer: string
	analysis: TAnalyzeMoves[] | undefined
}

export const AnalysisData: React.FC<Props> = ({ whitePlayer, blackPlayer, analysis }) => {
	const playersAnalysis = formatAnalysis(analysis)

	return (
		<div className="flex flex-col gap-2 w-full">
			<h2 className="text-2xl font-bold text-center text-accent">Анализ вашей партии</h2>
			<div className="flex items-center justify-between w-full glass-effect px-4 py-5 rounded-3xl">
				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-xl truncate w-40">{whitePlayer}: </h2>
					<div className="flex flex-col">
						<p className="font-semibold">
							Лучшие ходы: <span className="text-accent font-bold text-lg">{playersAnalysis?.white.bestMoves}</span>
						</p>
						<p className="font-semibold">
							Хорошие ходы: <span className="text-accent/80 font-bold text-lg">{playersAnalysis?.white.goodMoves}</span>
						</p>
						<p className="font-semibold">
							Неточные ходы: <span className="text-blue-400 font-bold text-lg">{playersAnalysis?.white.inaccurateMoves}</span>
						</p>
						<p className="font-semibold">
							Ошибки: <span className="text-orange-400 font-bold text-lg">{playersAnalysis?.white.mistakes}</span>
						</p>
						<p className="font-semibold">
							Зевки: <span className="text-red-400 font-bold text-lg">{playersAnalysis?.white.blunders}</span>
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-bold text-xl truncate w-40 text-secondary">{blackPlayer}: </h2>
					<div className="flex flex-col">
						<p className="font-semibold">
							Лучшие ходы: <span className="text-accent font-bold text-lg">{playersAnalysis?.black.bestMoves}</span>
						</p>
						<p className="font-semibold">
							Хорошие ходы: <span className="text-accent/80 font-bold text-lg">{playersAnalysis?.black.goodMoves}</span>
						</p>
						<p className="font-semibold">
							Неточные ходы: <span className="text-blue-400 font-bold text-lg">{playersAnalysis?.black.inaccurateMoves}</span>
						</p>
						<p className="font-semibold">
							Ошибки: <span className="text-orange-400 font-bold text-lg">{playersAnalysis?.black.mistakes}</span>
						</p>
						<p className="font-semibold">
							Зевки: <span className="text-red-400 font-bold text-lg">{playersAnalysis?.black.blunders}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
