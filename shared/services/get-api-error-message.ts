import axios from "axios"

const DEFAULT_MESSAGE = "Не удалось выполнить запрос. Попробуйте позже..."

export function getApiErrorMessage(error: unknown, fallback = DEFAULT_MESSAGE): string {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data
		if (data && typeof data === "object" && "message" in data) {
			const message = data.message
			if (typeof message === "string") return message
			if (Array.isArray(message) && typeof message[0] === "string") return message[0]
		}

		if (!error.response) {
			return "Нет связи с сервером. Попробуйте позже..."
		}
	}

	return fallback
}
