"use client"

import { API } from "@/shared/services/api"
import { getApiErrorMessage } from "@/shared/services/get-api-error-message"
import type { TGame } from "@/types/game.type"
import { Search } from "lucide-react"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

interface Props {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
	setGamesList: React.Dispatch<React.SetStateAction<TGame[]>>
	setTotalGames: React.Dispatch<React.SetStateAction<number>>
	className?: string
}

export const SearchPlayer: React.FC<Props> = ({ setLoading, setTotalGames, setGamesList, className }) => {
	const [value, setValue] = useState("")
	const [ErrorMessage, setErrorMessage] = useState("")

	const [, setPlayer] = useQueryState("player", { defaultValue: "" })

	const onSubmit = async (value: string) => {
		if (!value) {
			setErrorMessage("Имя игрока не может быть пустым!")
			return
		}

		try {
			setErrorMessage("")
			setLoading(true)

			const data = await API.games.getPlayerGames({ player: value })

			const games = data.games

			setPlayer(value)

			setTotalGames(data.totalGames)
			setGamesList(games)
		} catch (error) {
			setGamesList([])
			setTotalGames(0)

			setErrorMessage(getApiErrorMessage(error))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={className}>
			<div className="relative">
				<Input
					onChange={(e) => setValue(e.target.value)}
					placeholder="Введите никнейм игрока "
					className={cn(
						`focus-visible:ring-0  py-8 pl-12 md:pl-15  border border-white/10 rounded-4xl font-bold text-xl md:text-2xl, 
						 placeholder:text-base placeholder:text-md:text-lg placeholder:lg:text-2xl transition-all duration-300 ease-in-out`,
						ErrorMessage ? "border-red-500" : "",
					)}
				/>
				<Search className={cn("absolute left-3 top-4.5 text-accent size-7", ErrorMessage ? "text-red-500" : "")} />

				<Button
					onClick={() => onSubmit(value)}
					className="cursor-pointer text-md md:text-lg lg:text-xl absolute right-2 top-2 py-6 px-3 md:px-6 rounded-3xl bg-accent text-primary hover:bg-accent/80 transition-colors duration-300 ease-in-out"
				>
					Найти игрока
				</Button>
			</div>
			<div>{ErrorMessage && <p className="text-red-500 font-bold text-md md:text-lg lg:text-xl">*{ErrorMessage}</p>}</div>
		</div>
	)
}
