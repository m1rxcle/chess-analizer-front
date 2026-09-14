export type TAnalyzeMoves = {
	move: number
	color: "white" | "black"
	playerMove: string
	bestMove: string
	whiteScoreBefore: number
	whiteScoreAfter: number
	blackScoreBefore: number
	blackScoreAfter: number
	gameScoreBefore: number
	gameScoreAfter: number
	mate?: number | null
	evalLoss: number
	quality: Quality
	isBestMove: boolean
}

export enum Quality {
	BEST = "Лучший ход",
	GOOD = "Хороший ход",
	INACCURACY = "Неточный ход",
	MISTAKE = "Ошибка",
	BLUNDER = "Зевок",
}
