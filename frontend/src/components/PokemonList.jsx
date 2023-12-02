import { useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonDetails from "./PokemonDetails";
import { REGION_RANGES } from "../constants/constants";

import LinearProgress from "@mui/material/LinearProgress";

//accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [progress, setProgress] = useState(0);
	const [currentRegion, setCurrentRegion] = useState(null);
	const [expandedPanel, setExpandedPanel] = useState(null);

	//accordion
	const handleAccordionChange = (panel) => (event, isExpanded) => {
		if (isExpanded) {
			setCurrentRegion(panel);
			setExpandedPanel(panel); // Set the currently expanded panel
			setPokemons([]); // Reset current pokemons
			setOffset(REGION_RANGES[panel].start - 1); // Set offset to the start of the region
			setHasMore(true); // Reset hasMore to true
			setProgress(0); // Reset progress
			fetchRegionPokemons(panel, REGION_RANGES[panel].start - 1, []); // Fetch pokemons for the selected region
		} else {
			setExpandedPanel(null); // Close all panels
			setCurrentRegion(null);
		}
	};

	const fetchRegionPokemons = async (
		region,
		currentOffset, // Dont remove this, it's used to calculate the offset for the next fetch
		currentPokemons
	) => {
		const regionRange = REGION_RANGES[region];
		const totalPokemonInRegion = regionRange.end - regionRange.start + 1;

		// Reset loading state if it's a new region
		if (currentPokemons.length === 0) setLoading(true);

		const limit = Math.min(10, totalPokemonInRegion - currentPokemons.length);
		const calculatedOffset = regionRange.start - 1 + currentPokemons.length;

		try {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${calculatedOffset}`
			);
			setPokemons((prev) => [
				...currentPokemons, // Use the passed currentPokemons, not the possibly outdated prev
				...response.data.results.map((item) => ({
					name: item.name,
					url: item.url,
				})),
			]);
			setOffset(calculatedOffset + limit);
			setProgress(
				((currentPokemons.length + limit) / totalPokemonInRegion) * 100
			);

			// If after fetching new data we've reached the end, set hasMore to false
			if (currentPokemons.length + limit >= totalPokemonInRegion) {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching data: ", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchMoreData = () => {
		if (currentRegion && hasMore) {
			fetchRegionPokemons(currentRegion, offset, pokemons);
		}
	};

	return (
		<div>
			{Object.keys(REGION_RANGES).map((region) => (
				<Accordion
					key={region}
					expanded={expandedPanel === region}
					onChange={handleAccordionChange(region)}
				>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography>{region} Region</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{loading && <p>Loading...</p>}
						<InfiniteScroll
							dataLength={pokemons.length} // This is important field to render the next data
							next={fetchMoreData}
							hasMore={hasMore} // If there is more data to load
							loader={<p>Loading...</p>} // Loader element
						>
							{pokemons.map((pokemon, index) => (
								<div
									key={pokemon.name}
									role="pokemon"
									style={{
										cursor: "pointer",
									}} /* Add your styling here */
								>
									<p>{pokemon.name}</p>
									<PokemonDetails url={pokemon.url} />
								</div>
							))}
						</InfiniteScroll>
						{!hasMore && (
							<p style={{ textAlign: "center" }}>
								<b>Yay! You have seen it all</b>
							</p>
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};
export default PokemonList;
