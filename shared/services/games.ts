import { TPaginationGamesResponse } from "@/types/responses/pagination-games-response.type"
import { axiosInstance } from "./instance"

interface Props {
	player: string
	page?: number
	limit?: number
}

export const getPlayerGames = async ({ player, page = 1, limit = 10 }: Props): Promise<TPaginationGamesResponse> => {
	const { data } = await axiosInstance.get<TPaginationGamesResponse>(`/search/${player}`, {
		params: {
			page,
			limit,
		},
	})

	return data
}
