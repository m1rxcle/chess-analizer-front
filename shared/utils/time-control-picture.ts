/**
 *  Функция возвращает картинку в зависимости от временного контроля
 *
 * @param timeControl
 * @returns
 */

export function timeClassPicture(timeControl: string): string {
	switch (timeControl) {
		case "blitz":
			return "/icons/accent-blitz.svg"
		case "rapid":
			return "/icons/accent-rapid.svg"
		case "classical":
			return "/icons/accent-classical.svg"
		case "bullet":
			return "/icons/accent-bullet.svg"
		default:
			return "/icons/accent-blitz.svg"
	}
}
