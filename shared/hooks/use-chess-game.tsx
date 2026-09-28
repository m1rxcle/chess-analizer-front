import { StatusMove } from "@/types/status-move.enum"
import { Chess, type Square } from "chess.js"
import { useCallback, useState } from "react"
import { getStatusMove } from "../utils/get-status-move"

interface Props {
	loading: boolean
	currentMove: number
	setCurrentMove: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Управляет состоянием и взаимодействием с шахматной доской.
 *
 * Отвечает за:
 * - хранение позиций и ходов партии;
 * - навигацию по истории партии;
 * - выполнение ручных ходов;
 * - определение возможных ходов фигуры;
 * - определение текущего состояния хода для звуков;
 * - временное отображение пользовательских ходов.
 */

export default function useChessGame({ currentMove, loading, setCurrentMove }: Props) {
	// FEN-позиции доски для каждого хода партии.
	const [positions, setPositions] = useState<string[]>([])
	// SAN-нотация ходов партии для отображения в списке ходов.
	const [moves, setMoves] = useState<string[]>([])

	// Координаты исходной и конечной клетки каждого хода.
	// Используются для подсветки последнего хода и восстановления его статуса.
	const [moveSquares, setMoveSquares] = useState<{ from: string; to: string }[]>([])

	// Временная FEN-позиция после ручного хода пользователя.
	// Не изменяет историю оригинальной партии.
	const [customFen, setCustomFen] = useState<string | null>(null)

	// Координаты ручного хода пользователя для его подсветки на доске.
	const [customMoveSquares, setCustomMoveSquares] = useState<{ from: string; to: string } | null>(null)

	// Состояние какая  клетка находится под шахом
	const [checkSquare, setCheckSquare] = useState<string | null>(null)

	// Если пользователь сделал ручной ход, показываем его позицию.
	// Иначе показываем позицию из истории партии.
	const currentFen = customFen ?? positions[currentMove]

	const currentMoveSquares = customMoveSquares ?? moveSquares[currentMove - 1]

	/**
	 * Восстанавливает статус хода из истории партии.
	 *
	 * При навигации по ходам нам нужно заново выполнить конкретный ход,
	 * чтобы определить: обычный это ход, взятие, шах или мат.
	 *
	 * Отдельное состояние для статусов не хранится,
	 * поскольку positions и moveSquares уже содержат необходимые данные.
	 */
	const getMoveStatus = useCallback(
		(moveIndex: number) => {
			if (moveIndex <= 0 || !positions[moveIndex - 1] || !moveSquares[moveIndex - 1]) {
				return {
					status: StatusMove.MOVE,
					checkSquare: null,
				}
			}

			const chess = new Chess(positions[moveIndex - 1])

			const { from, to } = moveSquares[moveIndex - 1]

			try {
				const move = chess.move({
					from,
					to,
					promotion: "q",
				})

				return getStatusMove(chess, move)
			} catch (error) {
				return {
					status: StatusMove.MOVE,
					checkSquare: null,
				}
			}
		},
		[positions, moveSquares],
	)

	const firstMove = useCallback(() => {
		if (loading) return
		setCustomFen(null)
		setCurrentMove(0)
		setCustomMoveSquares(null)
		setCheckSquare(null)
	}, [setCurrentMove, loading])

	const previousMove = useCallback(() => {
		if (loading) return null

		const prev = Math.max(currentMove - 1, 0)

		if (prev === currentMove) return null

		setCustomFen(null)
		setCurrentMove(prev)
		setCustomMoveSquares(null)

		const moveResult = getMoveStatus(prev)

		setCheckSquare(moveResult.checkSquare)

		return moveResult
	}, [setCurrentMove, loading, currentMove, getMoveStatus])
	const nextMove = useCallback(() => {
		if (loading) return null

		const next = Math.min(currentMove + 1, positions.length - 1)

		if (next === currentMove) return null

		setCustomFen(null)
		setCurrentMove(next)
		setCustomMoveSquares(null)

		const moveResult = getMoveStatus(next)

		setCheckSquare(moveResult.checkSquare)

		return moveResult
	}, [positions.length, setCurrentMove, loading, currentMove, getMoveStatus])

	const lastMove = useCallback(() => {
		if (loading) return

		const lastMoveIndex = positions.length - 1
		const moveResult = getMoveStatus(lastMoveIndex)

		setCustomFen(null)
		setCurrentMove(lastMoveIndex)
		setCustomMoveSquares(null)
		setCheckSquare(moveResult.checkSquare)
	}, [positions.length, setCurrentMove, loading, getMoveStatus])

	/**
	 * Выполняет ручной ход пользователя на текущей позиции доски.
	 *
	 * Ход не добавляется в историю партии.
	 * Вместо этого создаётся временная FEN-позиция,
	 * которая используется для отображения результата на доске.
	 *
	 * Возвращает статус выполненного хода для воспроизведения звука.
	 */
	const makeMove = useCallback(
		(sourceSquare: string, targetSquare: string) => {
			if (!currentFen || sourceSquare === targetSquare || loading) {
				return false
			}

			const chess = new Chess(currentFen)

			try {
				const move = chess.move({
					from: sourceSquare,
					to: targetSquare,
					promotion: "q",
				})

				if (!move) return false

				const moveResult = getStatusMove(chess, move)

				setCheckSquare(moveResult.checkSquare)

				const fenAfter = chess.fen()

				setCustomFen(fenAfter)
				setCustomMoveSquares({ from: sourceSquare, to: targetSquare })

				return moveResult
			} catch {
				return false
			}
		},
		[currentFen, loading],
	)

	/**
	 * Возвращает возможные клетки для хода фигуры.
	 *
	 * Создаём Chess из текущей FEN-позиции и получаем
	 * все допустимые ходы выбранной фигуры.
	 */
	const getPossibleMoves = useCallback(
		(square: string) => {
			if (!currentFen) {
				return []
			}

			const chess = new Chess(currentFen)

			const moves = chess.moves({ square: square as Square, verbose: true }).map((move) => move.to)

			return moves
		},
		[currentFen],
	)

	return {
		moves,
		checkSquare,
		currentMove,
		positions,
		currentFen,
		currentMoveSquares,
		getPossibleMoves,
		makeMove,
		setCurrentMove,
		setPositions,
		setMoves,
		setMoveSquares,
		firstMove,
		previousMove,
		nextMove,
		lastMove,
	}
}
