import type { TGameMode } from "@/types/game-mode.type"
import { TStockfishMoveAnalysisResponse } from "@/types/responses/stockfish-move-analysis-response.type"
import { useEffect, useRef, useState } from "react"
import { API } from "../services/api"
import { getApiErrorMessage } from "../services/get-api-error-message"
import { toast } from "../ui/toast"

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
	const [currentMoveAnalysis, setCurrentMoveAnalysis] = useState<TStockfishMoveAnalysisResponse | null>(null)
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

				const data = await API.analysis.moveAnalysis({ username, gameId, move })

				setCurrentMoveAnalysis(data)
			} catch (error) {
				toast.add({
					type: "error",
					description: getApiErrorMessage(error),
				})
			} finally {
				setLoadingCurrentMoveAnalysis(false)
			}
		}

		getStockfishMove()
	}, [mode, currentMove, gameId, username, enabled, manualMove?.move])

	return { currentMoveAnalysis, loadingCurrentMoveAnalysis }
}
