import { Toaster } from "react-hot-toast";

export const CustomToast = () => {
	return (
		<Toaster
			position="top-center"
			reverseOrder={true}
			toastOptions={{
				className: "",
				success: {
					style: {
						backgroundColor: "#b3dfca",
						color: "#043a04",
						fontSize: ".8rem",
						fontWeight: "700",
					},
				},
				error: {
					style: {
						backgroundColor: "#dfb3b3",
						color: "#490c0c",
						fontSize: ".8rem",
						fontWeight: "700",
					},
				},
			}}
		/>
	);
};
