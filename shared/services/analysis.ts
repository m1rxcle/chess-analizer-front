import { TAnalyzeMoves } from "@/types/analyze-moves.type"
import { TStockfishMoveAnalysisResponse } from "@/types/responses/stockfish-move-analysis-response.type"
import { axiosInstance } from "./instance"

interface MoveAnalysisProps {
	username: string
	gameId: string
	move: string | number
}

type TGameAnalysisProps = Omit<MoveAnalysisProps, "move">

export const gameAnalysis = async ({ username, gameId }: TGameAnalysisProps) => {
	const { data } = await axiosInstance.get<TAnalyzeMoves[]>(`/analysis/${username}/${gameId}`)

	return data
}

export const moveAnalysis = async ({ username, gameId, move }: MoveAnalysisProps) => {
	const { data } = await axiosInstance.get<TStockfishMoveAnalysisResponse>(`/${username}/${gameId}/analyze`, {
		params: {
			move,
		},
	})

	return data
}
