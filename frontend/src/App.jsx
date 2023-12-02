import { Box } from "@mui/material";
import "./App.css";
// import Digimon from "./components/Digimon";

// import Nav from "./components/Nav";
// import Pokemon from "./components/Pokemon";
import PokemonList from "./components/PokemonList";

function App() {
	return (
		<Box
			sx={{
				bgcolor: "background.paper",
				border: "2px solid #000",
				boxShadow: 24,
				p: 4,
			}}
		>
			{/* <Nav /> */}
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>
				Test PKM Data
			</h2>
			{/* <Digimon /> */}

			<PokemonList />
		</Box>
	);
}

export default App;
