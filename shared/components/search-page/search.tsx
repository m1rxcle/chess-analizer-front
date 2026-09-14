"use client"

import type { TGame } from "@/types/game.type"
import { Loader2 } from "lucide-react"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { TitleBadge } from "../title-badge"
import { PlayerGames } from "./player-games"
import { SearchHeroImage } from "./search-hero-image"
import { SearchPlayer } from "./search-player"

export const Search = () => {
	const [gamesList, setGamesList] = useState<TGame[]>([])
	const [loading, setLoading] = useState(false)
	const [player] = useQueryState("player", { defaultValue: "" })
	const [totalGame, setTotalGames] = useState(0)

	return (
		<section className="flex flex-col lg:justify-center lg:flex-row lg:items-start gap-10 lg:gap-0">
			<div className="mx-5 space-y-10 md:mx-10 md:mt-10 lg:w-1/2 overflow-hidden">
				<TitleBadge text="Найдите игрока на Chess.com" />
				<div className="space-y-2">
					<h1 className="text-4xl  lg:text-7xl font-bold text-center lg:text-left">
						Найдите игрока и анализируйте <span className="text-accent">партии</span>
					</h1>
					<p className="text-secondary text-lg text-center lg:text-left lg:text-2xl ">
						Введите никнейм игрока с Chess.com и получайте доступ ко всем его партиям и статистике.
					</p>
				</div>
				<SearchPlayer setGamesList={setGamesList} setLoading={setLoading} setTotalGames={setTotalGames} />
			</div>
			<div className="w-full lg:w-2/3 flex justify-center items-center pb-20 md:pb-0 ">
				{loading && (
					<div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-10 w-1/2 mt-50">
						<Loader2 className="animate-spin size-10 md:size-12 lg:size-18 text-accent" />
					</div>
				)}

				{gamesList.length > 0 && !loading && (
					<div className="w-full mx-10">
						<div className="mb-4 ">
							<p className="text-secondary text-lg text-center  lg:text-lg">
								Всего партий: <span className="font-bold text-accent">{totalGame}</span>
							</p>
						</div>
						<PlayerGames isRecentGames gamesList={gamesList} player={player} className="w-full" />
					</div>
				)}

				{gamesList.length === 0 && !loading && <SearchHeroImage />}
			</div>
		</section>
	)
}
