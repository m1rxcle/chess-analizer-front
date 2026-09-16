/**
 * Преобразует контроль времени Chess.com в формат для отображения.
 *
 * Например:
 * "600" → "10 мин."
 * "600+5" → "10 + 5"
 *
 * Первое значение — время на партию в минутах,
 * второе — добавление времени за каждый ход в секундах.
 */

export const convertTimeControl = (timeControl: string) => {
	if (timeControl.includes("+")) {
		const generalTime = timeControl.split("+")[0]
		const additionalTime = timeControl.split("+")[1]

		return `${Number(generalTime) / 60} + ${Number(additionalTime)}`
	} else {
		const minutes = Number(timeControl) / 60
		return `${minutes} мин.`
	}
}
