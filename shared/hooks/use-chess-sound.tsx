import { StatusMove } from "@/types/status-move.enum"

/**
 * Управляет звуками шахматных ходов.
 *
 * Выбирает звуковой файл в зависимости от результата хода:
 * обычный ход, взятие, шах или мат.
 */
export default function useChessSound() {
	const playSound = (moveStatus: StatusMove) => {
		let audioSrc = "/sounds/move.mp3"

		switch (moveStatus) {
			case StatusMove.CAPTURE:
				audioSrc = "/sounds/capture.mp3"
				break

			case StatusMove.CHECK:
				audioSrc = "/sounds/check.mp3"
				break

			case StatusMove.CHECKMATE:
				audioSrc = "/sounds/checkmate.mp3"
				break
		}

		const audio = new Audio(audioSrc)

		audio.play()
	}

	return {
		playSound,
	}
}
