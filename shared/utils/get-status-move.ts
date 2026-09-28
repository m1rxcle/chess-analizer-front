import { StatusMove } from "@/types/status-move.enum"
import type { Chess, Move } from "chess.js"

/**
 * Определяет статус выполненного шахматного хода.
 *
 * Проверяет ход в следующем порядке:
 * мат → шах → взятие → обычный ход.
 *
 * `chess` должен содержать позицию после выполнения хода,
 * чтобы корректно определить шах или мат.
 */

export interface MoveStatus {
	status: StatusMove
	checkSquare: string | null
}

export function getStatusMove(chess: Chess, move: Move): MoveStatus {
	if (chess.isCheckmate()) {
		return {
			status: StatusMove.CHECKMATE,
			checkSquare: getKingSquare(chess),
		}
	}

	if (chess.isCheck()) {
		return {
			status: StatusMove.CHECK,
			checkSquare: getKingSquare(chess),
		}
	}

	if (move.isCapture() || move.isEnPassant()) {
		return {
			status: StatusMove.CAPTURE,
			checkSquare: null,
		}
	}

	return {
		status: StatusMove.MOVE,
		checkSquare: null,
	}
}

function getKingSquare(chess: Chess): string | null {
	const kingColor = chess.turn()
	const board = chess.board()

	for (let rank = 0; rank < board.length; rank++) {
		for (let file = 0; file < board[rank].length; file++) {
			const piece = board[rank][file]

			if (piece?.type === "k" && piece.color === kingColor) {
				return `${String.fromCharCode(97 + file)}${8 - rank}`
			}
		}
	}

	return null
}
