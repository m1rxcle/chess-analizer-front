import type { TGame } from "@/types/game.type"
import { Chess } from "chess.js"

interface Props {
	gameData: TGame
}

export const parseGamePgn = ({ gameData }: Props) => {
	const chess = new Chess()

	chess.loadPgn(gameData.pgn)

	const history = chess.history()

	const game = new Chess()

	const gamePositions = [game.fen()]

	const gameMoves: string[] = []

	const gameMoveSquares: { from: string; to: string }[] = []

	for (const move of history) {
		const result = game.move(move)

		gameMoves.push(result.san)

		gameMoveSquares.push({
			from: result.from,
			to: result.to,
		})

		gamePositions.push(game.fen())
	}

	return {
		gamePositions,
		gameMoves,
		gameMoveSquares,
	}
}
