import { useRef } from "react";
import { MessageSection } from "../../components/components";
import { useMessage } from "../../context/message_context";
import { postMessage } from "../../services/messageServices";
import toast from "react-hot-toast";
import "./Home.css";
import { ConfirmationDialog } from "../../components/ConfirmationDialog/ConfirmationDialog";

export const Home = () => {
	const userMessageRef = useRef<HTMLInputElement | null>(null);
	const { messages, isPostLoading, messageDispatch } = useMessage();

	function handleSort(type: string) {
		messageDispatch &&
			messageDispatch({
				type: "SORT_MESSAGES",
				payload: type,
			});
	}

	async function handlePost() {
		if (
			userMessageRef?.current?.value == null ||
			userMessageRef?.current?.value.trim() === ""
		) {
			toast.error("Post can't be empty!");
			return;
		}
		toast.promise(
			postMessage(userMessageRef?.current?.value ?? "", messageDispatch!),
			{
				loading: "Posting...",
				success: <b>Posted successfully!</b>,
				error: <b>Failed to post.</b>,
			},
		);
		userMessageRef.current.value = "";
	}

	function handleDeleteAll() {
		if (messages.length === 0) {
			toast.error("No post to delete");
			return;
		}
		messageDispatch &&
			messageDispatch({
				type: "SET_CONFIRMATION_DIALOG",
				payload: true,
			});
	}

	return (
		<div className="main-home">
			<h1>Chatter</h1>
			<p className="home-sub-text">
				Type something in the box below, then hit "Post".
			</p>
			<input type="text" name="" id="" ref={userMessageRef} />
			<button type="button" onClick={handlePost} disabled={isPostLoading}>
				Post!
			</button>
			<button
				type="button"
				className="delete-btn"
				onClick={handleDeleteAll}
			>
				Delete All
			</button>
			<ConfirmationDialog />
			<div className="sort-sec">
				<label htmlFor="sort">Sort By:</label>
				<select
					name="sort"
					id="sort"
					onChange={(opt) => {
						handleSort(opt.target.value);
					}}
				>
					<option value="FIRST_ADDED">First Added</option>
					<option value="RECENT">Recent</option>
				</select>
			</div>
			<MessageSection />
		</div>
	);
};
