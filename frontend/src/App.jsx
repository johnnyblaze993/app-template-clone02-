import "./App.css";
import Digimon from "./components/Digimon";

import Nav from "./components/Nav";
// import Pokemon from "./components/Pokemon";
import PokemonList from "./components/PokemonList";

function App() {
	return (
		<>
			<Nav />
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>
				PKM APP BOI!!!
			</h2>
			<Digimon />

			<PokemonList />
		</>
	);
}

export default App;
