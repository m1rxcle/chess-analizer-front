import type { TGameMode } from "@/types/game-mode.type"
import type { TStockfishAnalysisResponse } from "@/types/stockfish-analysis-response.type"
import { useEffect, useRef, useState } from "react"

interface Props {
	currentMove: number
	mode: TGameMode
	gameId: string
	username: string
	enabled: boolean
}

export function useMoveAnalysis({ currentMove, mode, gameId, username, enabled }: Props) {
	const [currentMoveAnalysis, setCurrentMoveAnalysis] = useState<TStockfishAnalysisResponse | null>(null)
	const [loadingCurrentMoveAnalysis, setLoadingCurrentMoveAnalysis] = useState(false)
	const analyzeMoveRef = useRef<number | null>(null)

	useEffect(() => {
		if (mode !== "analysis" || !enabled || currentMove === 0) return

		if (analyzeMoveRef.current === currentMove) return
		analyzeMoveRef.current = currentMove

		const getStockfishMove = async () => {
			console.log("🔥 ANALYZE MOVE:", currentMove)
			setLoadingCurrentMoveAnalysis(true)
			try {
				const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/${username}/${gameId}/analyze?move=${currentMove}`, {
					method: "GET",
				})

				if (!response.ok) {
					throw new Error("Failed to fetch game data")
				}

				const moveAnalysis: TStockfishAnalysisResponse = await response.json()

				console.log("moveAnalysis:", moveAnalysis)

				setCurrentMoveAnalysis(moveAnalysis)
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error fetching game data:", error.message)
				}
			} finally {
				setLoadingCurrentMoveAnalysis(false)
			}
		}

		getStockfishMove()
	}, [mode, currentMove, gameId, username, enabled])

	return { currentMoveAnalysis, loadingCurrentMoveAnalysis }
}
