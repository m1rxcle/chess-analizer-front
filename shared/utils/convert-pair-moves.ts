export const convertToPairMove = (moves: string[]): [string, string?][] => {
	const pairMoves: [string, string?][] = []
	for (let i = 0; i < moves.length; i += 2) {
		pairMoves.push([moves[i], moves[i + 1]])
	}
	return pairMoves
}
