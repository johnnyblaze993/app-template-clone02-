import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetails from "./PokemonDetails";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	maxHeight: "80%",
	overflow: "auto",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [open, setOpen] = useState(false);
	const [progress, setProgress] = useState(0);

	const fetchPokemons = async () => {
		if (pokemons.length >= 151) {
			setHasMore(false);
			return;
		}

		setLoading(true);
		try {
			const limit = Math.min(10, 151 - pokemons.length);
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
			);
			setPokemons((prev) => [
				...prev,
				...response.data.results.map((item) => ({
					name: item.name,
					url: item.url,
				})),
			]);
			setOffset((prevOffset) => prevOffset + limit);
			// Update progress
			setProgress(((pokemons.length + limit) / 151) * 100);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
		setLoading(false);
	};

	const handleKantoClick = () => {
		setOpen(true);
		if (pokemons.length === 0) {
			fetchPokemons();
		}
	};

	const fetchMoreData = () => {
		fetchPokemons();
	};

	return (
		<div>
			<button onClick={handleKantoClick}>Kanto</button>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="pokemon-modal-title"
				aria-describedby="pokemon-modal-description"
			>
				<Box sx={style} id="modal-content">
					<LinearProgress variant="determinate" value={progress} />
					<h1 id="pokemon-modal-title">Kanto Pokédex</h1>
					<div id="pokemon-modal-description">
						<InfiniteScroll
							dataLength={pokemons.length}
							next={fetchMoreData}
							hasMore={hasMore}
							loader={<div>Loading...</div>}
							endMessage={
								<p style={{ textAlign: "center" }}>
									<b>Yay! You have seen it all</b>
								</p>
							}
							scrollableTarget="modal-content"
						>
							{pokemons.map((pokemon, index) => (
								<div
									key={pokemon.name}
									style={{
										// display: "flex",
										// flexDirection: "row",
										// justifyContent: "space-between",
										alignItems: "center",
										borderBottom: "1px solid black",
										paddingBottom: "5px",
										marginBottom: "5px",
									}}
								>
									<p>{index + 1}</p>
									<p>
										{
											//make first letter uppercase
											pokemon.name.charAt(0).toUpperCase() +
												pokemon.name.slice(1)
										}
									</p>
									<PokemonDetails url={pokemon.url} />
								</div>
							))}
						</InfiniteScroll>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default PokemonList;
