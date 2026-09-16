/**
 * Возвращает путь к иконке в зависимости от типа контроля времени.
 *
 * Поддерживает основные типы партий Chess.com:
 * bullet, blitz, rapid и classical.
 *
 * Если тип не распознан, используется иконка blitz.
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
