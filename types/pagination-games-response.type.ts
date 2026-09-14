import type { TGame } from "./game.type"

export type TPaginationGamesResponse = {
	games: TGame[]
	page?: number
	limit?: number
	hasNextPage: boolean
	totalGames: number
}
