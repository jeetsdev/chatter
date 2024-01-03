import "./App.css";
import { Home } from "./pages/Home/Home";
import { CustomToast } from "./components/components";

function App() {
	return (
		<div className="App">
			<CustomToast />
			<Home />
		</div>
	);
}

export default App;
