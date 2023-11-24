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
	const [currentRegion, setCurrentRegion] = useState(null);

	// TODO seperate out the fetch so that we can reuse for other regions
	// TODO create a variable for the number of pokemon in each region so we know when to stop. this can be  aconstant in its own file really. but keep in here for now.
	// TODO create tests for this component

	const REGION_RANGES = {
		Kanto: { start: 1, end: 151 },
		Johto: { start: 152, end: 251 },
		Hoenn: { start: 252, end: 386 },
	};

	const fetchRegionPokemons = async (region) => {
		const regionRange = REGION_RANGES[region];
		const totalPokemonInRegion = regionRange.end - regionRange.start + 1;
		const alreadyFetched = pokemons.length;

		if (alreadyFetched >= totalPokemonInRegion) {
			setHasMore(false);
			return;
		}

		setLoading(true);
		try {
			const limit = Math.min(10, totalPokemonInRegion - alreadyFetched);
			// Calculate offset based on the region's starting point
			const calculatedOffset = regionRange.start - 1 + alreadyFetched;

			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${calculatedOffset}`
			);
			setPokemons((prev) => [
				...prev,
				...response.data.results.map((item) => ({
					name: item.name,
					url: item.url,
				})),
			]);
			setOffset(calculatedOffset + limit);
			setProgress(((alreadyFetched + limit) / totalPokemonInRegion) * 100);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
		setLoading(false);
	};

	const handleRegionClick = (region) => {
		setPokemons([]);
		setProgress(0);
		setOpen(true);
		setCurrentRegion(region);
		fetchRegionPokemons(region);
	};

	const fetchMoreData = () => {
		if (currentRegion) {
			fetchRegionPokemons(currentRegion, offset, pokemons);
		}
	};

	const handleModalClose = () => {
		// Resetting states when modal is closed
		setOpen(false);
		setPokemons([]);
		setOffset(0);
		setProgress(0);
		setCurrentRegion(null);
		setHasMore(true);
	};
	// const fetchPokemons = async () => {
	// 	if (pokemons.length >= 151) {
	// 		setHasMore(false);
	// 		return;
	// 	}

	// 	setLoading(true);
	// 	try {
	// 		const limit = Math.min(10, 151 - pokemons.length);
	// 		const response = await axios.get(
	// 			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
	// 		);
	// 		setPokemons((prev) => [
	// 			...prev,
	// 			...response.data.results.map((item) => ({
	// 				name: item.name,
	// 				url: item.url,
	// 			})),
	// 		]);
	// 		setOffset((prevOffset) => prevOffset + limit);
	// 		// Update progress
	// 		setProgress(((pokemons.length + limit) / 151) * 100);
	// 	} catch (error) {
	// 		console.error("Error fetching data: ", error);
	// 	}
	// 	setLoading(false);
	// };

	// const handleKantoClick = () => {
	// 	setOpen(true);
	// 	if (pokemons.length === 0) {
	// 		fetchPokemons();
	// 	}
	// };

	// const fetchMoreData = () => {
	// 	fetchPokemons();
	// };

	return (
		<div>
			{/* <button onClick={handleKantoClick}>Kanto</button> */}
			{Object.keys(REGION_RANGES).map((region) => (
				<button key={region} onClick={() => handleRegionClick(region)}>
					{region}
				</button>
			))}
			<Modal
				open={open}
				onClose={handleModalClose}
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
