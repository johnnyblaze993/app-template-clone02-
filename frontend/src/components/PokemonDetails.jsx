import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { pokemonBGColors } from "../constants/constants";
import { CircularProgress } from "@mui/material";

const PokemonDetails = ({ url }) => {
	const [details, setDetails] = useState(null);

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
		return <CircularProgress color="success" size="lg" variant="outlined" />;
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

PokemonDetails.propTypes = {
	url: PropTypes.string.isRequired, // Assuming url should be a string and is required
};

export default PokemonDetails;
