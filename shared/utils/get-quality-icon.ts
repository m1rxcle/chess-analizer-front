import { Quality } from "@/types/analyze-moves.type"

export function getQualityIcon(quality: Quality): string {
	switch (quality) {
		case Quality.BEST:
			return "/icons/best-move.svg"
		case Quality.INACCURACY:
			return "/icons/incorrect-move.svg"
		case Quality.MISTAKE:
			return "/icons/mistake-move.svg"
		case Quality.BLUNDER:
			return "/icons/blunder-move.svg"
		case Quality.GOOD:
			return ""
	}
}
