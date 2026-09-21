import type { TAnalyzeMoves } from "@/types/analyze-moves.type"
import type { TGameMode } from "@/types/game-mode.type"
import { useEffect, useState } from "react"
import { API } from "../services/api"
import { getApiErrorMessage } from "../services/get-api-error-message"
import { toast } from "../ui/toast"

interface Props {
	mode: TGameMode
	username: string | undefined
	gameId: string | undefined
}

/**
 * Загружает и хранит результаты анализа шахматной партии.
 *
 * Запрос выполняется только в режиме "analysis".
 * Полученные результаты содержат оценку каждого хода,
 * лучший ход Stockfish и качество хода игрока.
 */

export default function useGameAnalysis({ mode, username, gameId }: Props) {
	const [analyzeEnd, setAnalyzeEnd] = useState(false)

	const [analysis, setAnalysis] = useState<TAnalyzeMoves[]>()

	const [loadingAnalysis, setLoadingAnalysis] = useState(false)

	useEffect(() => {
		if (mode !== "analysis") return
		if (!username || !gameId) return

		const handleShowAnalysis = async () => {
			setLoadingAnalysis(true)
			setAnalyzeEnd(false)
			try {
				const data = await API.analysis.gameAnalysis({ username, gameId })

				setAnalysis(data)
			} catch (error) {
				toast.add({
					type: "error",
					description: getApiErrorMessage(error),
				})
			} finally {
				setLoadingAnalysis(false)
				setAnalyzeEnd(true)
			}
		}
		handleShowAnalysis()
	}, [mode, username, gameId])

	return { analysis, loadingAnalysis, analyzeEnd }
}
