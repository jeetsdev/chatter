export const formatTime = (time: string) => {
	const date: Date = new Date(time);
	const formattedTime: string = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true, // Use 12-hour clock
	}).format(date);

	return formattedTime;
};
