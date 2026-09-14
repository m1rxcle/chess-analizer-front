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
