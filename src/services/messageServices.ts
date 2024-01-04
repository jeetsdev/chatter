import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { Constants } from "../constants/constants";
import axiosInstance from "../helpers/axiosInstance";
import { IMessageDispatchType, IMessageType } from "../helpers/interface";
import { Dispatch } from "react";
import toast from "react-hot-toast";

export let cancelMessageTokenSource: CancelTokenSource | null = null;

export const getAllMessages = async (
	dispatch: Dispatch<IMessageDispatchType>,
) => {
	try {
		dispatch({
			type: "SET_LOADING",
			payload: true,
		});
		cancelMessageTokenSource = axios.CancelToken.source();
		const res: AxiosResponse = await axiosInstance.get(
			Constants.MESSAGE_URL,
			{
				cancelToken: cancelMessageTokenSource.token,
			},
		);
		dispatch({
			type: "GET_MESSAGE_SUCCESS",
			payload: res?.data ?? [],
		});
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log("Request canceled");
		} else {
			toast.error("Failed to get all messages");
		}
	} finally {
		dispatch({
			type: "SET_LOADING",
			payload: false,
		});
	}
};

export const postMessage = async (
	message: string,
	dispatch: Dispatch<IMessageDispatchType>,
) => {
	dispatch({
		type: "SET_POST_LOADING",
		payload: true,
	});
	try {
		const res = await axiosInstance.post(`${Constants.MESSAGE_URL}/`, {
			text: message,
		});
		if (res.status === 201) {
			dispatch({
				type: "POST_MESSAGE_SUCCESS",
				payload: res?.data,
			});
		} else {
			throw new Error("Post messages failed");
		}
	} catch (error) {
		throw new Error("Post messages failed");
	} finally {
		dispatch({
			type: "SET_POST_LOADING",
			payload: false,
		});
	}
};
export const deleteMessage = async (
	id: number,
	dispatch: Dispatch<IMessageDispatchType>,
) => {
	try {
		const res = await axiosInstance.delete(
			`${Constants.MESSAGE_URL}/${id}/`,
		);
		if (res.status === 204) {
			getAllMessages(dispatch);
		} else {
			throw new Error("Delete messages failed");
		}
	} catch (error) {
		toast.error("Failed to delete message");
	}
};
export const deleteAllMessage = async (
	messages: IMessageType[],
	dispatch: Dispatch<IMessageDispatchType>,
) => {
	try {
		const promises = [];
		for (let i = 0; i < messages.length; i++) {
			promises.push(
				axiosInstance.delete(
					`${Constants.MESSAGE_URL}/${messages[i].id}/`,
				),
			);
		}
		await Promise.all(promises);
		dispatch({
			type: "SET_CONFIRMATION_DIALOG",
			payload: false,
		});
		getAllMessages(dispatch);
		debugger;
	} catch (error) {
		throw new Error("Delete messages failed");
	}
};
