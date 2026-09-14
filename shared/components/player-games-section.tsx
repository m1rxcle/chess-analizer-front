"use client"

import type { TGame } from "@/types/game.type"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { RecentGames } from "./search-page/recent-games"
import { SearchPlayer } from "./search-page/search-player"

export const PlayerGamesSection = () => {
	const [gamesList, setGamesList] = useState<TGame[]>([])
	const [loading, setLoading] = useState(false)

	return (
		<div className="flex flex-col gap-5">
			<div>
				<h1 className="text-4xl font-bold text-center">Free Chess Analizer</h1>
				<p>
					Мы собрали свой собственный анализатор партий и сделали его доступным для всех, <br />
					чтобы все могли <span className="font-bold">бесплатно</span> анализировать свои партии на chess.com
				</p>
			</div>
			<div>
				<SearchPlayer setGamesList={setGamesList} setLoading={setLoading} />
			</div>
			<div className="flex flex-col ">
				{loading && <Loader2 size={40} className="animate-spin text-center mx-auto" />}

				{gamesList.length > 0 && !loading && (
					<div className="space-y-2">
						<h1>
							Всего партий (<span className="font-bold">{gamesList.length}</span>)
						</h1>
						<RecentGames gamesList={gamesList.slice(0, 10)} />
					</div>
				)}
			</div>
		</div>
	)
}
