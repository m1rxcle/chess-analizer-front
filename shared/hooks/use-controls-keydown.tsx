import { useEffect } from "react"

interface Props {
	disabled: boolean

	previousMove: () => void
	nextMove: () => void
	firstMove: () => void
	lastMove: () => void
}

export default function useControlsKeydown({ disabled, previousMove, nextMove, firstMove, lastMove }: Props) {
	useEffect(() => {
		if (disabled) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				previousMove()
			} else if (event.key === "ArrowRight") {
				nextMove()
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
	}, [previousMove, nextMove, firstMove, lastMove, disabled])
}
