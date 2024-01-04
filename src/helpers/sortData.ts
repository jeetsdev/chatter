import { IMessageType } from "./interface";

export const sortData = (data: Array<IMessageType>, type: string) => {
	let currentData = [...data];
	if (type === "RECENT") {
		currentData.sort((a, b) => {
			const timeA = new Date(a.timestamp).getTime();
			const timeB = new Date(b.timestamp).getTime();
			return timeB - timeA;
		});
		return currentData;
	}
	if (type === "FIRST_ADDED") {
		currentData.sort((a, b) => {
			const timeA = new Date(a.timestamp).getTime();
			const timeB = new Date(b.timestamp).getTime();
			return timeA - timeB;
		});
		return currentData;
	}
	return currentData;
};
