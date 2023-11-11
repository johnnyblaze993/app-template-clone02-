import React, { useState, useEffect, useRef } from "react";
import PokemonDetails from "./PokemonDetails";

const PokemonList = () => {
	const [pokemons, setPokemons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const isInitialMount = useRef(true);

	const fetchPokemons = async () => {
		if (!hasMore || pokemons.length >= 151) return;

		setLoading(true);
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
		);
		const data = await response.json();
		setPokemons((prev) => [
			...new Set([
				...prev,
				...data.results.map((item) => ({ name: item.name, url: item.url })),
			]),
		]);
		setOffset((prevOffset) => prevOffset + 10); // Update offset after successful fetch
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
