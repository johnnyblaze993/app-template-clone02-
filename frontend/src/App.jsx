import "./App.css";
import Digimon from "./components/Digimon";

import Nav from "./components/Nav";

function App() {
	return (
		<>
			<Nav />
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>Compose App</h2>
			<Digimon />
		</>
	);
}

export default App;
