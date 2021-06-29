import Navbar from "./Components/Layout/Navbar";
import MainContent from "./Components/MainContent";
import "./App.css";
function App() {
	return (
		<div className="App bg-light">
			<Navbar></Navbar>
			<MainContent></MainContent>
		</div>
	);
}

export default App;
