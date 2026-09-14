import { Chess, type Square } from "chess.js"
import { useCallback, useState } from "react"

interface Props {
	loading: boolean
	currentMove: number
	onResetManualMove?: () => void
	setCurrentMove: React.Dispatch<React.SetStateAction<number>>
}

export default function useChessGame({ currentMove, loading, setCurrentMove }: Props) {
	const [positions, setPositions] = useState<string[]>([])
	const [moves, setMoves] = useState<string[]>([])

	const [moveSquares, setMoveSquares] = useState<{ from: string; to: string }[]>([])
	const [moveStatus, setMoveStatus] = useState<"normal" | "check" | "checkmate">("normal")

	const [customFen, setCustomFen] = useState<string | null>(null)
	const [customMoveSquares, setCustomMoveSquares] = useState<{ from: string; to: string } | null>(null)

	const currentFen = customFen ?? positions[currentMove]
	const currentMoveSquares = customMoveSquares ?? moveSquares[currentMove - 1]

	const firstMove = useCallback(() => {
		if (loading) return
		setCustomFen(null)
		setCurrentMove(0)
		setCustomMoveSquares(null)
	}, [setCurrentMove, loading])

	const previousMove = useCallback(() => {
		if (loading) return
		setCustomFen(null)
		setCurrentMove((prevMove) => Math.max(prevMove - 1, 0))
		setCustomMoveSquares(null)
	}, [setCurrentMove, loading])
	const nextMove = useCallback(() => {
		if (loading) return
		setCustomFen(null)
		setCurrentMove((prevMove) => Math.min(prevMove + 1, positions.length - 1))
		setCustomMoveSquares(null)
	}, [positions.length, setCurrentMove, loading])

	const lastMove = useCallback(() => {
		if (loading) return
		setCustomFen(null)
		setCurrentMove(positions.length - 1)
		setCustomMoveSquares(null)
	}, [positions.length, setCurrentMove, loading])

	const makeMove = useCallback(
		(sourceSquare: string, targetSquare: string) => {
			if (!currentFen || sourceSquare === targetSquare || loading) {
				return false
			}

			const chess = new Chess(currentFen)

			try {
				const move = chess.move({
					from: sourceSquare,
					to: targetSquare,
					promotion: "q",
				})

				if (!move) return false

				const fenAfter = chess.fen()

				setCustomFen(fenAfter)
				setCustomMoveSquares({ from: sourceSquare, to: targetSquare })

				return !!move
			} catch {
				return false
			}
		},
		[currentFen, loading],
	)

	const getPossibleMoves = useCallback(
		(square: string) => {
			if (!currentFen) {
				return []
			}

			const chess = new Chess(currentFen)

			const moves = chess.moves({ square: square as Square, verbose: true }).map((move) => move.to)

			return moves
		},
		[currentFen],
	)

	return {
		moves,
		currentMove,
		positions,
		currentFen,
		moveStatus,
		currentMoveSquares,
		getPossibleMoves,
		makeMove,
		setCurrentMove,
		setPositions,
		setMoves,
		setMoveSquares,
		setMoveStatus,
		firstMove,
		previousMove,
		nextMove,
		lastMove,
	}
}
