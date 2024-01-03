import { useRef, useState } from "react";
import { MessageSection } from "../../components/components";
import { useMessage } from "../../context/message_context";
import { postMessage } from "../../services/messageServices";
import toast from "react-hot-toast";
import "./Home.css";

export const Home = () => {
	const userMessageRef = useRef<HTMLInputElement | null>(null);
	const { isPostLoading, messageDispatch } = useMessage();
	const [sortType, setSortType] = useState("NONE");

	function handleSort(type: string) {
		setSortType(type);
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
			<button type="button" className="delete-btn">
				Delete All
			</button>
			<div className="sort-sec">
				<label htmlFor="sort">Sort By:</label>
				<select
					name="sort"
					id="sort"
					onChange={(e) => {
						console.log(e);
					}}
				>
					<option value="RECENT">Recent</option>
					<option value="FIRST_ADDED">First Added</option>
				</select>
			</div>
			<MessageSection />
			<p></p>
		</div>
	);
};
