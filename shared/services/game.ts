import { TGame } from "@/types/game.type"
import { axiosInstance } from "./instance"

interface Props {
	username: string
	gameId: string
}

export const getPlayerGame = async ({ username, gameId }: Props): Promise<TGame> => {
	const { data } = await axiosInstance.get(`/games/${username}/${gameId}`)

	return data
}
