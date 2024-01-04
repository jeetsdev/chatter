import React, { useCallback, useState } from "react";
import { useMessage } from "../../context/message_context";
import { IMessageType } from "../../helpers/helpers";
import { MessageCard } from "../components";
import "./MessageSection.css";

export const MessageSection = () => {
	const { messages } = useMessage();
	const [currentPageNo, setCurrentPageNo] = useState(1);

	const totalPageCount = Math.ceil(messages.length / 10);
	const getCurrentPageData = useCallback(() => {
		return messages.slice(
			(currentPageNo - 1) * 10,
			(currentPageNo - 1) * 10 + 10,
		);
	}, [messages, currentPageNo]);

	return (
		<div className="pagination-sec">
			<div className="pagination-data">
				{getCurrentPageData()?.map((message: IMessageType) => {
					return <MessageCard message={message} key={message.id} />;
				})}
			</div>
			<div className="pagination-pages">
				{Array.from({ length: totalPageCount }).map((_, ele) => {
					return (
						<div
							id={currentPageNo === ele + 1 ? "active-page" : ""}
							key={ele}
							onClick={() => setCurrentPageNo(ele + 1)}
						>
							{ele + 1}
						</div>
					);
				})}
			</div>
		</div>
	);
};
