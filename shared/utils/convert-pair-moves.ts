/**
 * Группирует ходы партии в пары: ход белых + ход чёрных.
 *
 * Например: ["e4", "e5", "Nf3"] → [["e4", "e5"], ["Nf3", undefined]]
 */

export const convertToPairMove = (moves: string[]): [string, string?][] => {
	const pairMoves: [string, string?][] = []
	for (let i = 0; i < moves.length; i += 2) {
		pairMoves.push([moves[i], moves[i + 1]])
	}
	return pairMoves
}
