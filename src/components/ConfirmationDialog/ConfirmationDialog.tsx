import toast from "react-hot-toast";
import { useMessage } from "../../context/message_context";
import { deleteAllMessage } from "../../services/messageServices";
import "./ConfirmationDialog.css";

export const ConfirmationDialog = () => {
	const { isConfirmationDialogOpen, messages, messageDispatch } =
		useMessage();

	const handleDispatch = (dialogState: boolean) => {
		messageDispatch &&
			messageDispatch({
				type: "SET_CONFIRMATION_DIALOG",
				payload: dialogState,
			});
	};

	return (
		<div
			className={`delete-dialog ${
				isConfirmationDialogOpen ? "visible" : "hidden"
			}`}
		>
			<div className="dialog-content">
				<p>Do you want to delete the post?</p>
				<div className="button-container">
					<button
						onClick={() =>
							toast.promise(
								deleteAllMessage(messages, messageDispatch!),
								{
									loading: "Deleting...",
									success: <b>Deleted successfully!</b>,
									error: <b>Failed to Delete all post.</b>,
								},
							)
						}
						className="delete-button"
					>
						Yes
					</button>
					<button
						onClick={() => handleDispatch(false)}
						className="cancel-button"
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};
