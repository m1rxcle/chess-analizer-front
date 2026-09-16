"use client"

import useChessSound from "@/shared/hooks/use-chess-sound"
import { cn } from "@/shared/lib/utils"
import { getQualityIcon } from "@/shared/utils/get-quality-icon"
import type { Quality } from "@/types/analyze-moves.type"
import type { TPlayer } from "@/types/player.type"
import type { StatusMove } from "@/types/status-move.enum"
import { Loader2 } from "lucide-react"
import React from "react"
import { Chessboard, type ChessboardOptions, type PieceDropHandlerArgs, type PieceHandlerArgs, type SquareHandlerArgs } from "react-chessboard"
import { PlayerNameSkeleton } from "../skeletons/player-name-skeleton"

interface Props {
	chessboardOptions: ChessboardOptions
	loadingGame: boolean
	loadingAnalysis: boolean
	loadingCurrentMoveAnalysis: boolean
	opponent?: TPlayer
	currentFen?: string
	currentPlayer?: TPlayer
	responseMove?: string
	quality?: string
	evaluationMove?: string
	setPossibleMoves: React.Dispatch<React.SetStateAction<string[]>>
	getPossibleMoves: (square: string) => string[]
	makeMove: (sourceSquare: string, targetSquare: string) => StatusMove | false
}

export const CustomChessboard: React.FC<Props> = ({
	currentPlayer,
	opponent,
	currentFen,
	chessboardOptions,
	loadingGame,
	loadingAnalysis,
	loadingCurrentMoveAnalysis,
	responseMove,
	quality,
	evaluationMove,
	setPossibleMoves,
	getPossibleMoves,
	makeMove,
}) => {
	const { playSound } = useChessSound()

	const loading = loadingGame || loadingAnalysis || loadingCurrentMoveAnalysis

	const handlePieceDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
		if (!targetSquare || loading) return false

		const result = makeMove(sourceSquare, targetSquare)

		if (result) {
			playSound(result)
			setPossibleMoves([])
		}

		return !!result
	}

	const onSquareClick = ({ square }: SquareHandlerArgs) => {
		if (loadingCurrentMoveAnalysis || loading) return
		const moves = getPossibleMoves(square)

		setPossibleMoves(moves)
	}

	const onPieceDrag = ({ isSparePiece, piece, square }: PieceHandlerArgs) => {
		if (!square || loading) return

		const moves = getPossibleMoves(square)

		setPossibleMoves(moves)
	}

	const arrows = responseMove
		? [
				{
					startSquare: responseMove.slice(0, 2),
					endSquare: responseMove.slice(2, 4),
					color: "#ff0",
				},
			]
		: []

	const evaluationSquare = evaluationMove?.slice(2, 4)

	const getEvaluationIcon = getQualityIcon(quality as Quality)

	return (
		<div className="flex-1 w-full glass-effect px-4 py-5 rounded-3xl max-w-175">
			<div className="flex flex-col gap-2">
				{loadingGame ? (
					<PlayerNameSkeleton />
				) : (
					<div className="flex gap-1 items-center">
						<span className="text-lg font-bold">{opponent?.username}</span>
						<span>({opponent?.rating})</span>
					</div>
				)}
				<Chessboard
					options={{
						...chessboardOptions,
						arrows,
						squareRenderer: ({ square, piece, children }) => {
							const showEvaluation = square === evaluationSquare && getEvaluationIcon

							const squareStyle = chessboardOptions.squareStyles?.[square]

							return (
								<div className={cn("relative h-full w-full", loading ? "pointer-events-none opacity-50" : "")} style={squareStyle}>
									{children}

									{showEvaluation && !loading && <img src={getEvaluationIcon} alt="evaluation" className="absolute -right-6 -top-3 z-20 w-14 h-8 " />}
									{showEvaluation && loading && (
										<div className="absolute -right-6 -top-3 z-20 w-14 h-8 flex items-center justify-center">
											<Loader2 className="animate-spin" />
										</div>
									)}
								</div>
							)
						},
						position: currentFen,
						onPieceDrop: handlePieceDrop,
						onSquareClick,
						onPieceDrag,
					}}
				/>
				{loadingGame ? (
					<PlayerNameSkeleton />
				) : (
					<div className="flex gap-1 items-center">
						<span className="text-lg font-bold">{currentPlayer?.username}</span>
						<span>({currentPlayer?.rating})</span>
					</div>
				)}
			</div>
		</div>
	)
}
