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

export function getStatusMove(chess: Chess, move: Move): StatusMove {
	if (chess.isCheckmate()) {
		return StatusMove.CHECKMATE
	}

	if (chess.isCheck()) {
		return StatusMove.CHECK
	}

	if (move.isCapture() || move.isEnPassant()) {
		return StatusMove.CAPTURE
	}

	return StatusMove.MOVE
}
