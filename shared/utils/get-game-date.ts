/**
 * Форматирует timestamp даты игры в локальный формат.
 *
 * Для десктопа используется сокращённое название месяца:
 * "05 сент. 2026 г."
 *
 * Для мобильных устройств используется более компактный формат:
 * "05.09.26"
 *
 * @param timestamp Unix timestamp в секундах
 * @param isMobile Использовать компактный формат даты
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
