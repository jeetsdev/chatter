import { sortData } from "../helpers/helpers";
import {
	IMessageDispatchType,
	IMessageContextType,
} from "../helpers/interface";
export const messageReducer = (
	state: IMessageContextType,
	action: IMessageDispatchType,
) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, isLoading: action.payload };
		case "SET_POST_LOADING":
			return { ...state, isPostLoading: action.payload };
		case "GET_MESSAGE_SUCCESS":
			return { ...state, messages: action.payload };
		case "POST_MESSAGE_SUCCESS":
			return { ...state, messages: [...state.messages, action.payload] };
		case "SORT_MESSAGES":
			return {
				...state,
				messages: sortData(state.messages, action.payload),
			};
		case "SET_CONFIRMATION_DIALOG":
			console.log(action.payload);
			return {
				...state,
				isConfirmationDialogOpen: action.payload,
			};
		default:
			return state;
	}
};
