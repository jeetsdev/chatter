import { createContext } from "react";
import { useContext, useEffect, useReducer } from "react";

import { messageReducer } from "../reducers/messageReducer";
import { IMessageContextType } from "../helpers/helpers";
import {
	cancelMessageTokenSource,
	getAllMessages,
} from "../services/messageServices";

type IProps = {
	children: React.ReactNode;
};

const messageData: IMessageContextType = {
	messages: [],
	status: "",
	isLoading: false,
	isPostLoading: false,
};

export const MessageContext = createContext<IMessageContextType>(messageData);

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: IProps) => {
	const [state, dispatch] = useReducer(messageReducer, messageData);

	useEffect(() => {
		(async () => {
			await getAllMessages(dispatch);
		})();
		return () => {
			cancelMessageTokenSource?.cancel("Component unmounted");
		};
	}, []);

	return (
		<MessageContext.Provider
			value={{ ...state, messageDispatch: dispatch }}
		>
			{children}
		</MessageContext.Provider>
	);
};
