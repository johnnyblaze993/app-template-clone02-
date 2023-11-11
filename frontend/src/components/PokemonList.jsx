import { useState, useEffect, useRef } from "react";
import PokemonDetails from "./PokemonDetails";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const isInitialMount = useRef(true);

	const fetchPokemons = async () => {
		// Calculate the number of Pokémon left to fetch to reach 151
		const remaining = 151 - pokemons.length;
		if (remaining <= 0) {
			setHasMore(false);
			return;
		}

		setLoading(true);
		const limit = Math.min(10, remaining); // Fetch only the remaining Pokémon if less than 10
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await response.json();
		setPokemons((prev) => [
			...new Set([
				...prev,
				...data.results.map((item) => ({ name: item.name, url: item.url })),
			]),
		]);
		setOffset((prevOffset) => prevOffset + limit); // Update offset by the number of Pokémon fetched
		setLoading(false);
	};

	// Intersection Observer for infinite scrolling
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					hasMore &&
					!loading &&
					!isInitialMount.current
				) {
					fetchPokemons();
				}
			},
			{
				threshold: 0.5,
			}
		);

		const observerTarget = document.querySelector("#observer-target");
		if (observerTarget) {
			observer.observe(observerTarget);
		}

		return () => {
			if (observerTarget) {
				observer.unobserve(observerTarget);
			}
		};
	}, [loading, hasMore]);

	// To prevent initial fetch on mount
	useEffect(() => {
		isInitialMount.current = false;
	}, []);

	return (
		<div>
			{pokemons.map((pokemon, index) => (
				<div key={pokemon.name}>
					<p>{pokemon.name}</p>
					<PokemonDetails url={pokemon.url} />
				</div>
			))}
			{loading && <p>Loading...</p>}
			<div id="observer-target" style={{ height: "20px" }} />
		</div>
	);
};

export default PokemonList;
