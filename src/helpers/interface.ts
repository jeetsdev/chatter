import { Dispatch } from "react";

export interface IMessageType {
	id: number;
	text: string;
	source: string;
	timestamp: string;
}
export interface IMessageContextType {
	messages: Array<IMessageType>;
	status?: string;
	isLoading: boolean;
	isPostLoading: boolean;
	messageDispatch?: Dispatch<IMessageDispatchType>;
	isConfirmationDialogOpen:boolean,
}
export interface IMessageDispatchType {
	type: string;
	payload?: any;
}
