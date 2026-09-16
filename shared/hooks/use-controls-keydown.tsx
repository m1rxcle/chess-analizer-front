import type { StatusMove } from "@/types/status-move.enum"
import { useEffect } from "react"
import useChessSound from "./use-chess-sound"

interface Props {
	disabled: boolean

	previousMove: () => StatusMove | null
	nextMove: () => StatusMove | null
	firstMove: () => void
	lastMove: () => void
}

/**
 * Управляет навигацией по партии с помощью клавиш клавиатуры.
 *
 * ArrowLeft / ArrowRight — переход между ходами с воспроизведением звука.
 * ArrowUp / ArrowDown — переход к начальной или последней позиции.
 *
 * Навигация блокируется через disabled, например во время загрузки игры
 * или анализа.
 */

export default function useControlsKeydown({ disabled, previousMove, nextMove, firstMove, lastMove }: Props) {
	const { playSound } = useChessSound()

	useEffect(() => {
		if (disabled) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				const status = previousMove()
				if (status) playSound(status)
			} else if (event.key === "ArrowRight") {
				const status = nextMove()
				if (status) playSound(status)
			} else if (event.key === "ArrowUp") {
				firstMove()
			} else if (event.key === "ArrowDown") {
				lastMove()
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [previousMove, nextMove, firstMove, lastMove, playSound, disabled])
}
