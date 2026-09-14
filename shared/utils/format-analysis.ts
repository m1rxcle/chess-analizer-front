import { Quality, type TAnalyzeMoves } from "@/types/analyze-moves.type"
import type { TPlayerAnalysis } from "@/types/player-analysis.type"

export function formatAnalysis(analysis: TAnalyzeMoves[] | undefined): { white: TPlayerAnalysis; black: TPlayerAnalysis } | undefined {
	if (!analysis) return

	const result = {
		white: {
			bestMoves: 0,
			blunders: 0,
			goodMoves: 0,
			mistakes: 0,
			inaccurateMoves: 0,
		},

		black: {
			bestMoves: 0,
			blunders: 0,
			goodMoves: 0,
			mistakes: 0,
			inaccurateMoves: 0,
		},
	}

	analysis.forEach((move) => {
		const player = result[move.color]

		if (move.isBestMove) {
			player.bestMoves++
		}

		if (move.isBestMove) {
			player.bestMoves++
			return
		}

		switch (move.quality) {
			case Quality.GOOD:
				player.goodMoves++
				break

			case Quality.INACCURACY:
				player.inaccurateMoves++
				break

			case Quality.MISTAKE:
				player.mistakes++
				break

			case Quality.BLUNDER:
				player.blunders++
				break
		}
	})

	return result
}
