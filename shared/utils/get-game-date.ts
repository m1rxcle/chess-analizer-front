/**
 *  Функция возвращает дату игры
 *
 * @param timestamp
 * @returns
 */

export function getGameDate(timestamp: string, isMobile: boolean = false): string {
	const dateObj = new Date(+timestamp * 1000)

	let result = ""

	if (!isMobile) {
		result = dateObj.toLocaleString("ru-RU", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		})
	} else {
		result = dateObj.toLocaleString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		})
	}

	return result
}
