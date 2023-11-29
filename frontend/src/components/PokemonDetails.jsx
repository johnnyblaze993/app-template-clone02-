import { useState, useEffect } from "react";

const PokemonDetails = ({ url }) => {
	const [details, setDetails] = useState(null);

	// TODO: Move this to a constants file
	const pokemonBGColors = {
		normal: "#A8A77A",
		fire: "#EE8130",
		water: "#6390F0",
		electric: "#F7D02C",
		grass: "#7AC74C",
		ice: "#96D9D6",
		fighting: "#C22E28",
		poison: "#A33EA1",
		ground: "#E2BF65",
		flying: "#A98FF3",
		psychic: "#F95587",
		bug: "#A6B91A",
		rock: "#B6A136",
		ghost: "#735797",
		dragon: "#6F35FC",
		dark: "#705746",
		steel: "#B7B7CE",
		fairy: "#D685AD",
	};

	useEffect(() => {
		const fetchDetails = async () => {
			const response = await fetch(url);
			const data = await response.json();
			setDetails(data);
		};

		fetchDetails();
	}, [url]);

	if (!details) {
		// TODO: Add a loading spinner
		return <p>Loading details...</p>;
	}

	const backgroundStyle =
		details.types.length === 2
			? `linear-gradient(to right, ${
					pokemonBGColors[details.types[0].type.name]
			  }, ${pokemonBGColors[details.types[1].type.name]})`
			: pokemonBGColors[details.types[0].type.name];

	return (
		<div
			style={{
				backgroundColor:
					details.types.length === 1
						? pokemonBGColors[details.types[0].type.name]
						: undefined,
				backgroundImage:
					details.types.length === 2 ? backgroundStyle : undefined,
				border: "2px solid #000",
				boxShadow: "24px 24px 48px -24px rgba(0,0,0,0.75)",
				padding: "16px",
				borderRadius: "8px",
				display: "inline-block", // Adjust as needed for your layout
				width: "100%",
			}}
		>
			<p>{details.types.map((typeEntry) => typeEntry.type.name).join(", ")}</p>
		</div>
	);
};

export default PokemonDetails;
