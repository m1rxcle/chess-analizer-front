"use client"

import { CHESSBOARD_OPTIONS } from "@/shared/constants/chessboard-options"
import useChessGame from "@/shared/hooks/use-chess-game"
import useControlsKeydown from "@/shared/hooks/use-controls-keydown"
import useGameAnalysis from "@/shared/hooks/use-game-analysis"
import { useMoveAnalysis } from "@/shared/hooks/use-move-analysis"
import { parseGamePgn } from "@/shared/utils/parse-game-pgn"
import type { TGameMode } from "@/types/game-mode.type"
import type { TGame } from "@/types/game.type"
import type { TPlayer } from "@/types/player.type"
import { useParams, useRouter } from "next/navigation"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import { type ChessboardOptions } from "react-chessboard"
import { CustomChessboard } from "./custom-chessboard"
import { GameDetails } from "./game-details"
interface Props {
	mode: TGameMode
}

export const GameViewer: React.FC<Props> = ({ mode }) => {
	const router = useRouter()

	const { username, gameId } = useParams<{ username: string; gameId: string }>()

	const [game, setGame] = useState<TGame | undefined>()

	const [currentMove, setCurrentMove] = useQueryState(
		"move",
		parseAsInteger.withDefault(0).withOptions({
			shallow: true,
		}),
	)

	const [currentPlayer, setCurrentPlayer] = useState<TPlayer | undefined>()
	const [opponent, setOpponent] = useState<TPlayer | undefined>()
	const [orientation, setOrientation] = useState<"white" | "black" | undefined>()

	const [possibleMoves, setPossibleMoves] = useState<string[]>([])

	const [loadingGame, setLoadingGame] = useState(false)

	const { analysis, loadingAnalysis, analyzeEnd } = useGameAnalysis({ mode, username, gameId })

	const { currentMoveAnalysis, loadingCurrentMoveAnalysis } = useMoveAnalysis({
		currentMove,
		mode,
		gameId,
		username,
		enabled: analyzeEnd,
	})

	const {
		currentFen,
		currentMoveSquares,
		moves,
		positions,
		getPossibleMoves,
		makeMove,
		setMoveSquares,
		setMoves,
		setPositions,
		firstMove,
		previousMove,
		nextMove,
		lastMove,
	} = useChessGame({
		currentMove,
		loading: loadingGame || loadingAnalysis || loadingCurrentMoveAnalysis,
		setCurrentMove,
	})

	useControlsKeydown({
		previousMove,
		nextMove,
		firstMove,
		lastMove,
		disabled: loadingGame || loadingAnalysis || loadingCurrentMoveAnalysis,
	})

	useEffect(() => {
		const loadGame = async () => {
			setLoadingGame(true)
			try {
				const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API + `/games/${username}/${gameId}`)
				if (!response.ok) {
					throw new Error("Failed to fetch game data")
				}

				const gameData: TGame = await response.json()

				setGame(gameData)

				setOrientation(gameData.white.username === username ? "white" : "black")
				setCurrentPlayer(gameData.white.username === username ? gameData.white : gameData.black)
				setOpponent(gameData.white.username !== username ? gameData.white : gameData.black)

				const { gameMoveSquares, gameMoves, gamePositions } = parseGamePgn({ gameData })

				setPositions(gamePositions)
				setMoves(gameMoves)
				setMoveSquares(gameMoveSquares)
			} catch (error) {
				console.log("Error fetching game data:", error)
				if (error instanceof Error) {
					console.error("Error fetching game data:", error.message)
				}
			} finally {
				setLoadingGame(false)
			}
		}
		loadGame()
	}, [gameId, username])

	const chessboardOptions: ChessboardOptions = {
		...CHESSBOARD_OPTIONS,
		squareStyles: {
			...(currentMoveSquares
				? {
						[currentMoveSquares.from]: {
							backgroundColor: "rgba(255, 215, 0, 0.5)",
						},
						[currentMoveSquares.to]: {
							backgroundColor: "rgba(255, 215, 0, 0.5)",
							boxShadow: "inset 0 0 20px rgba(255, 215, 0, 0.6)",
						},
					}
				: {}),

			...Object.fromEntries(
				possibleMoves.map((move) => [
					move,
					{
						background: "radial-gradient(circle, rgba(0, 0, 0, 0.5) 20%, transparent 21%)",
					},
				]),
			),
		},
		boardOrientation: orientation,
	}

	const handleShowAnalysis = () => {
		if (mode === "analysis") return

		router.push(`/${username}/game/${gameId}/analysis`)
	}

	return (
		<div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-center gap-6 mx-5 lg:mx-10">
			<CustomChessboard
				chessboardOptions={chessboardOptions}
				currentPlayer={currentPlayer}
				opponent={opponent}
				currentFen={currentFen}
				loadingGame={loadingGame}
				loadingCurrentMoveAnalysis={loadingCurrentMoveAnalysis}
				loadingAnalysis={loadingAnalysis}
				responseMove={currentMoveAnalysis?.responseMove}
				quality={currentMoveAnalysis?.quality}
				evaluationMove={currentMoveAnalysis?.playerMove}
				setPossibleMoves={setPossibleMoves}
				getPossibleMoves={getPossibleMoves}
				makeMove={makeMove}
			/>

			<GameDetails
				currentMove={currentMove}
				moves={moves}
				positions={positions}
				loadingGame={loadingGame}
				loadingAnalysis={loadingAnalysis}
				loadingCurrentMoveAnalysis={loadingCurrentMoveAnalysis}
				analysis={analysis}
				whitePlayer={game?.white.username}
				blackPlayer={game?.black.username}
				handleShowAnalysis={handleShowAnalysis}
				setCurrentMove={setCurrentMove}
				firstMove={firstMove}
				previousMove={previousMove}
				nextMove={nextMove}
				lastMove={lastMove}
			/>
		</div>
	)
}
