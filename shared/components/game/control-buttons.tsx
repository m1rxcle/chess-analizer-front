import useChessSound from "@/shared/hooks/use-chess-sound"
import { Button } from "@/shared/ui/button"
import { StatusMove } from "@/types/status-move.enum"
interface Props {
	firstMove: () => void
	previousMove: () => StatusMove | null
	nextMove: () => StatusMove | null
	lastMove: () => void

	loading: boolean
	currentMove: number
	positions: string[]
	className?: string
}

export const ControlButtons: React.FC<Props> = ({ firstMove, previousMove, nextMove, lastMove, loading, currentMove, positions, className }) => {
	const { playSound } = useChessSound()

	return (
		<>
			<div className={`flex justify-center gap-4 ${className}`}>
				<Button
					disabled={currentMove === 0 || loading}
					className="border-2 border-white/80 bg-accent/80 text-primary px-4 py-2 lg:px-8 lg:py-5 text-base md:text-lg lg:text-xl hover:bg-accent/50 cursor-pointer  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
					onClick={() => {
						firstMove()
					}}
				>
					⏮
				</Button>
				<Button
					disabled={currentMove === 0 || loading}
					className="border-2 border-white/80 bg-accent/80 text-primary px-4 py-2 lg:px-8 lg:py-5 text-base md:text-lg lg:text-xl hover:bg-accent/50 cursor-pointer  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
					onClick={() => {
						const status = previousMove()
						if (status) playSound(status)
					}}
				>
					◀
				</Button>
				<Button
					disabled={currentMove === positions.length - 1 || loading}
					className="border-2 border-white/80 bg-accent/80 text-primary px-4 py-2 lg:px-8 lg:py-5 text-base md:text-lg lg:text-xl hover:bg-accent/50 cursor-pointer  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
					onClick={() => {
						const status = nextMove()
						if (status) playSound(status)
					}}
				>
					▶
				</Button>
				<Button
					disabled={currentMove === positions.length - 1 || loading}
					className="border-2 border-white/80 bg-accent/80 text-primary px-4 py-2 lg:px-8 lg:py-5 text-base md:text-lg lg:text-xl hover:bg-accent/50 cursor-pointer  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
					onClick={() => {
						lastMove()
					}}
				>
					⏭
				</Button>
			</div>
		</>
	)
}
