"use client"

import { cn } from "@/shared/lib/utils"
import { convertTimeControl } from "@/shared/utils/convert-time-control"
import type { TGame } from "@/types/game.type"
import { ChevronRight, CircleSlash2, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "../../ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../ui/table"
import { getGameDate } from "../../utils/get-game-date"
import { timeClassPicture } from "../../utils/time-control-picture"

interface Props {
	gamesList: TGame[]
	isRecentGames: boolean
	player: string
	className?: string
}

export const PlayerGames: React.FC<Props> = ({ gamesList, isRecentGames, player, className }) => {
	const router = useRouter()

	return (
		<div className={cn("glass-effect rounded-3xl ", className)}>
			<Table>
				<TableHeader>
					<TableRow className="border-accent bg-transparent hover:bg-transparent">
						<TableHead></TableHead>
						<TableHead className="text-accent font-bold text-base md:text-lg lg:text-xl">Шахматисты</TableHead>
						<TableHead className="text-accent font-bold text-base md:text-lg lg:text-xl">Результат</TableHead>
						<TableHead className="text-accent font-bold text-base md:text-lg lg:text-xl">Дата</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{gamesList.map((game) => {
						const playerResult = player === game.white.username ? game.white.result : game.black.result

						return (
							<TableRow
								onClick={() => {
									if (player) {
										router.push(`/${player}/game/${game.uuid}`)
									}
								}}
								key={game.uuid}
								className="cursor-pointer border-accent hover:bg-accent/10 transition-colors duration-300 ease-in-out"
							>
								<TableCell className="w-[100px]">
									<div className="flex flex-col items-center gap-1">
										<Image src={timeClassPicture(game.time_class)} alt="clock" width={20} height={20} className="w-4 h-4 lg:w-6 lg:h-6 " />
										<span className="text-sm md:text-base lg:text-lg">{convertTimeControl(game.time_control)}</span>
									</div>
								</TableCell>
								<TableCell className="w-[200px] max-w-[200px]">
									<div className="flex min-w-0  flex-col text-base md:text-lg lg:text-xl font-bold">
										<div className="flex min-w-0 items-center gap-2">
											<div className="h-3 w-3 shrink-0 bg-white" />

											<div className="flex min-w-0 flex-1">
												<span className={`min-w-0 truncate ${player === game.white.username ? "text-accent/90" : ""}`}>{game.white.username}</span>

												<span className="shrink-0">({game.white.rating})</span>
											</div>
										</div>

										<div className="flex min-w-0 items-center gap-2">
											<div className="h-3 w-3 shrink-0 bg-gray-500" />

											<div className="flex min-w-0 flex-1">
												<span className={`min-w-0 truncate ${player === game.black.username ? "text-accent/90" : ""}`}>{game.black.username}</span>

												<span className="shrink-0">({game.black.rating})</span>
											</div>
										</div>
									</div>
								</TableCell>

								<TableCell className="w-[50px]">
									<div className="hidden lg:flex items-center gap-4">
										<div className="hidden lg:flex flex-col text-base md:text-lg lg:text-xl font-bold">
											<span>{game.white.result === "win" ? "1" : "0"}</span>
											<span>{game.black.result === "win" ? "1" : "0"}</span>
										</div>
										<div className="p-1 glass-effect">
											{playerResult === "win" ? (
												<Plus className="text-accent size-6 " />
											) : playerResult === "draw" || playerResult === "agreed" ? (
												<CircleSlash2 className="text-primary size-6" />
											) : (
												<Minus className="text-red-500 size-6" />
											)}
										</div>
									</div>
									<div className="flex items-center gap-2 lg:hidden">
										<div className="flex items-center text-lg">
											<span>{game.white.result === "win" ? "1" : "0"}:</span>
											<span>{game.black.result === "win" ? "1" : "0"}</span>
										</div>
										<div className="p-1 glass-effect">
											{playerResult === "win" ? (
												<Plus className="text-accent size-4 " />
											) : playerResult === "draw" || playerResult === "agreed" ? (
												<CircleSlash2 className="text-primary size-4" />
											) : (
												<Minus className="text-red-500 size-4" />
											)}
										</div>
									</div>
								</TableCell>
								<TableCell className="w-[100px]">
									<span className="hidden md:block text-base md:text-lg lg:text-xl font-bold">{getGameDate(game.end_time, false)}</span>
									<span className="block md:hidden text-base md:text-lg lg:text-xl font-bold">{getGameDate(game.end_time, true)}</span>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
				{isRecentGames && (
					<TableFooter className="bg-transparent border-accent ">
						<TableRow className="hover:bg-accent/10 transition-colors duration-300 ease-in-out cursor-pointer">
							<TableCell colSpan={4} className="text-center">
								<Button
									onClick={() => router.push(`/${player}/games`)}
									variant="link"
									className="cursor-pointer text-accent text-base md:text-lg lg:text-xl"
								>
									Подробнее
									<span>
										<ChevronRight size={16} />
									</span>
								</Button>
							</TableCell>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</div>
	)
}
