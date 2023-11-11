import React, { useState, useEffect, useRef } from "react";
import PokemonDetails from "./PokemonDetails";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [fetchTriggered, setFetchTriggered] = useState(false);
	const initialFetchCompleted = useRef(false);

	const fetchPokemons = async () => {
		// Calculate the number of Pokémon left to reach 151
		const remaining = 151 - pokemons.length;
		if (remaining <= 0 || !fetchTriggered) {
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
			...prev,
			...data.results.map((item) => ({ name: item.name, url: item.url })),
		]);

		// Update offset only if there are more Pokémon to fetch
		if (remaining > limit) {
			setOffset((prevOffset) => prevOffset + limit);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (fetchTriggered) {
			fetchPokemons();
		}
	}, [fetchTriggered, offset]);

	// Intersection Observer for infinite scrolling
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					setOffset((prev) => prev + 10);
				}
			},
			{ threshold: 0.5 }
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

	// 'Kanto' button click handler
	const handleKantoClick = () => {
		if (!fetchTriggered) {
			setFetchTriggered(true);
			setOffset(0); // Ensure offset is set to 0 on initial fetch
		}
	};

	return (
		<div>
			<button onClick={handleKantoClick} disabled={fetchTriggered}>
				Kanto
			</button>
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
