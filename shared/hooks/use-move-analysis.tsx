import type { TGameMode } from "@/types/game-mode.type"
import type { TStockfishAnalysisResponse } from "@/types/stockfish-analysis-response.type"
import { useEffect, useRef, useState } from "react"

interface Props {
	currentMove: number
	mode: TGameMode
	gameId: string
	username: string
	manualMove?: { fenBefore: string; fenAfter: string; move: string } | null
	enabled: boolean
}

/**
 * Загружает анализ Stockfish для текущего хода партии.
 *
 * Анализ выполняется только в режиме "analysis" и когда enabled === true.
 * Для каждого хода выполняется отдельный запрос на backend.
 *
 * Поддерживает два сценария:
 * - анализ хода из оригинальной партии;
 * - анализ ручного хода пользователя.
 *
 * Повторный запрос для одного и того же хода предотвращается
 * с помощью analyzeMoveRef.
 */

export function useMoveAnalysis({ currentMove, mode, gameId, username, manualMove, enabled }: Props) {
	const [currentMoveAnalysis, setCurrentMoveAnalysis] = useState<TStockfishAnalysisResponse | null>(null)
	const [loadingCurrentMoveAnalysis, setLoadingCurrentMoveAnalysis] = useState(false)
	const analyzeMoveRef = useRef<string | null>(null)

	useEffect(() => {
		if (mode !== "analysis" || !enabled || currentMove === 0) return

		const moveKey = manualMove?.move ? `manual:${currentMove}:${manualMove.move}` : `game:${currentMove}`

		if (analyzeMoveRef.current === moveKey) return
		analyzeMoveRef.current = moveKey

		const getStockfishMove = async () => {
			setLoadingCurrentMoveAnalysis(true)
			try {
				const move = manualMove?.move ?? currentMove

				const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/${username}/${gameId}/analyze?move=${move}`, {
					method: "GET",
				})

				if (!response.ok) {
					throw new Error("Failed to fetch game data")
				}

				const moveAnalysis: TStockfishAnalysisResponse = await response.json()

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
	}, [mode, currentMove, gameId, username, enabled, manualMove?.move])

	return { currentMoveAnalysis, loadingCurrentMoveAnalysis }
}
