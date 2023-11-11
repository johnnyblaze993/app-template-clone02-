import "./App.css";
import Digimon from "./components/Digimon";

import Nav from "./components/Nav";
// import Pokemon from "./components/Pokemon";
import PokemonList from "./components/PokemonList";

function App() {
	return (
		<>
			<Nav />
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>john</h2>
			<Digimon />
			{/* <Pokemon /> */}
			<PokemonList />
		</>
	);
}

export default App;
