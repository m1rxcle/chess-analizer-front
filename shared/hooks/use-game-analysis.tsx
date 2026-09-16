import type { TAnalyzeMoves } from "@/types/analyze-moves.type"
import type { TGameMode } from "@/types/game-mode.type"
import { useEffect, useState } from "react"

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
		const handleShowAnalysis = async () => {
			setLoadingAnalysis(true)
			setAnalyzeEnd(false)
			try {
				const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/analysis/${username}/${gameId}`, {
					method: "GET",
				})

				if (!response.ok) {
					throw new Error("Failed to fetch game data")
				}

				const analysis = await response.json()

				console.log("✅ ANALYSIS JSON RECEIVED")

				setAnalysis(analysis)
			} catch (error) {
				if (error instanceof Error) {
					console.error("Error fetching game data:", error.message)
				}
			} finally {
				setLoadingAnalysis(false)
				setAnalyzeEnd(true)

				console.log("🏁 FETCH ANALYSIS FINISH")
			}
		}
		handleShowAnalysis()
	}, [mode, username, gameId])

	return { analysis, loadingAnalysis, analyzeEnd }
}
