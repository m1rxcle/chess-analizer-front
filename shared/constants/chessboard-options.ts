import type { ChessboardOptions } from "react-chessboard"

/**
 * Общие настройки шахматной доски.
 *
 * Используются для единого оформления доски во всех режимах
 * просмотра партии и анализа.
 */
export const CHESSBOARD_OPTIONS: ChessboardOptions = {
	boardStyle: {
		borderRadius: "5px",
	},
	lightSquareStyle: {
		backgroundColor: "#d0e4d3",
		borderColor: "transparent",
	},
	darkSquareStyle: {
		backgroundColor: "#379c55",
		borderColor: "transparent",
	},
}
