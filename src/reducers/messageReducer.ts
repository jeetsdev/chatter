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
		case "GET_MESSAGE_FAILED":
			return { ...state, status: "failed" };
		case "POST_MESSAGE_SUCCESS":
			return { ...state, messages: [...state.messages, action.payload] };
		case "DELETE_MESSAGE_SUCCESS":
			return {
				...state,
				messages: state.messages.splice(action.payload, 1),
			};
		default:
			return state;
	}
};
