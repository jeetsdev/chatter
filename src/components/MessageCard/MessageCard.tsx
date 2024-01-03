import React from "react";
import { IMessageType } from "../../helpers/interface";
import { deleteMessage } from "../../services/messageServices";
import { useMessage } from "../../context/message_context";
import "./MessageCard.css";
import { MessageIcon } from "../Icons/MessageIcon";
import { formatTime } from "../../helpers/helpers";

type IPropType = {
	message: IMessageType;
};

export const MessageCard = ({ message }: IPropType) => {
	const { messageDispatch } = useMessage();

	return (
		<div className="message-card">
			<div className="message-icon">
				<MessageIcon />
			</div>
			<div className="messages-data">
				<div>
					<p className="data-source">{message.source}</p>

					<p>- {formatTime(message.timestamp)}</p>
					<p
						className="delete-message"
						onClick={() =>
							deleteMessage(message?.id, messageDispatch!)
						}
					>
						Delete
					</p>
				</div>
				<p className="data-text">{message.text}</p>
			</div>
		</div>
	);
};
