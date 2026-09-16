"use client"

import type { TGame } from "@/types/game.type"
import type { TPaginationGamesResponse } from "@/types/pagination-games-response.type"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { PlayerGames } from "./player-games"

export const PlayerGamesList = () => {
	const [gamesList, setGamesList] = useState<TGame[]>([])
	const [totalGame, setTotalGames] = useState(0)

	const [page, setPage] = useState(1)
	const [hasNextPage, setHasNextPage] = useState(true)

	const { username } = useParams<{ username: string }>()

	const [loading, setLoading] = useState(false)

	const bottomRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!username) return

		const onLoad = async () => {
			try {
				setLoading(true)

				const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/search/${username}?page=${page}&limit=15`, {
					method: "GET",
				})

				if (!res.ok) {
					setGamesList([])
					throw new Error("Player not found")
				}

				const data: TPaginationGamesResponse = await res.json()

				const games: TGame[] = data.games

				setGamesList((prevGames) => (page === 1 ? games : [...prevGames, ...games]))
				setTotalGames(data.totalGames)
				setHasNextPage(data.hasNextPage)
			} catch (error) {
				if (error instanceof Error && error.message) {
					console.log(error.message)
				}
			} finally {
				setLoading(false)
			}
		}

		onLoad()
	}, [username, page])

	useEffect(() => {
		const element = bottomRef.current

		if (!element) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !loading) {
					setPage((prevPage) => prevPage + 1)
				}
			},
			{
				threshold: 1,
			},
		)

		observer.observe(element)

		return () => {
			observer.disconnect()
		}
	}, [hasNextPage, loading])

	return (
		<section>
			<p className="text-secondary text-lg text-center  lg:text-lg">
				Всего партий: <span className="font-bold text-accent">{totalGame}</span>
			</p>

			<PlayerGames player={username} isRecentGames={false} gamesList={gamesList} className="mx-5 lg:mx-10 mb-5" />

			{hasNextPage && (
				<div ref={bottomRef} className="mb-20">
					{loading && <Loader2 className="animate-spin size-10 md:size-12 lg:size-18 text-accent text-center mx-auto" />}
				</div>
			)}
		</section>
	)
}
