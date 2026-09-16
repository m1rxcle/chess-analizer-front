import { cn } from "@/shared/lib/utils"
import { convertToPairMove } from "@/shared/utils/convert-pair-moves"
import type { TAnalyzeMoves } from "@/types/analyze-moves.type"
import type { StatusMove } from "@/types/status-move.enum"
import React from "react"
import { AnalysisData } from "../analysis/analysis-data"
import { LoadingGameSkeleton } from "../skeletons/loading-game-skeleton"
import { ControlButtons } from "./control-buttons"
import { MakeAnalysisButton } from "./make-analysis-button"

interface Props {
	moves: string[]

	currentMove: number
	whitePlayer: string | undefined
	blackPlayer: string | undefined
	positions: string[]
	analysis: TAnalyzeMoves[] | undefined
	loadingGame: boolean
	loadingAnalysis: boolean
	loadingCurrentMoveAnalysis: boolean
	handleShowAnalysis: () => void
	setCurrentMove: (move: number) => void
	firstMove: () => void
	previousMove: () => StatusMove | null
	nextMove: () => StatusMove | null
	lastMove: () => void
}

export const GameDetails: React.FC<Props> = ({
	moves,

	currentMove,
	whitePlayer,
	blackPlayer,
	positions,
	analysis,
	loadingGame,
	loadingAnalysis,
	loadingCurrentMoveAnalysis,
	handleShowAnalysis,
	setCurrentMove,
	firstMove,
	previousMove,
	nextMove,
	lastMove,
}) => {
	const currentPairIndex = currentMove > 0 ? Math.floor((currentMove - 1) / 2) : -1
	const isCurrentWhiteMove = currentMove > 0 && currentMove % 2 === 1
	const isCurrentBlackMove = currentMove > 0 && currentMove % 2 === 0

	return (
		<div className="glass-effect px-4 py-5 lg:px-8 lg:py-10 rounded-3xl space-y-8 ">
			<div className="flex flex-col gap-10 h-full justify-between">
				<ul className="hidden lg:flex lg:flex-col lg:items-start lg:max-h-80 lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-accent  lg:scrollbar-track-transparent">
					{loadingGame || loadingAnalysis ? (
						<LoadingGameSkeleton />
					) : (
						convertToPairMove(moves).map((pair, index) => {
							const isCurrentPair = currentPairIndex === index

							return (
								<li key={index} className="flex items-center w-full justify-between text-sm font-bold">
									<div className="hidden lg:flex w-12 shrink-0">
										<span className="text-secondary">{index + 1}.</span>
									</div>

									<div className="w-24 shrink-0">
										<span
											onClick={() => setCurrentMove(index * 2 + 1)}
											className={cn(
												"cursor-pointer  hover:text-primary/50 transition-colors duration-200 ease-in-out",
												isCurrentPair && isCurrentWhiteMove ? "text-accent " : "",
											)}
										>
											{pair[0] || ""}
										</span>
									</div>

									<div className="w-24 shrink-0">
										<span
											onClick={() => setCurrentMove(index * 2 + 2)}
											className={cn(
												"cursor-pointer hover:text-primary/50 transition-colors duration-200 ease-in-out",
												isCurrentPair && isCurrentBlackMove ? "text-accent " : "",
											)}
										>
											{pair[1] || ""}
										</span>
									</div>
								</li>
							)
						})
					)}
				</ul>
				<div className="hidden lg:flex flex-col items-center justify-center gap-2 ">
					{analysis && analysis.length > 0 ? (
						<AnalysisData analysis={analysis} blackPlayer={blackPlayer || ""} whitePlayer={whitePlayer || ""} />
					) : (
						<MakeAnalysisButton handleShowAnalysis={handleShowAnalysis} loadingAnalysis={loadingAnalysis} />
					)}

					<ControlButtons
						firstMove={firstMove}
						previousMove={previousMove}
						nextMove={nextMove}
						lastMove={lastMove}
						currentMove={currentMove}
						positions={positions}
						loading={loadingGame || loadingAnalysis || loadingCurrentMoveAnalysis}
					/>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 lg:hidden">
					<ControlButtons
						firstMove={firstMove}
						previousMove={previousMove}
						nextMove={nextMove}
						lastMove={lastMove}
						currentMove={currentMove}
						positions={positions}
						loading={loadingGame || loadingAnalysis || loadingCurrentMoveAnalysis}
					/>

					{analysis && analysis.length > 0 ? (
						<AnalysisData analysis={analysis} blackPlayer={blackPlayer || ""} whitePlayer={whitePlayer || ""} />
					) : (
						<MakeAnalysisButton handleShowAnalysis={handleShowAnalysis} loadingAnalysis={loadingAnalysis} />
					)}
				</div>
			</div>
		</div>
	)
}
