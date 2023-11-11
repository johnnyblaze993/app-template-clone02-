import { useState, useEffect } from "react";

const PokemonDetails = ({ url }) => {
	const [details, setDetails] = useState(null);

	useEffect(() => {
		const fetchDetails = async () => {
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			setDetails(data);
		};

		fetchDetails();
	}, [url]);

	if (!details) {
		return <p>Loading details...</p>;
	}

	return (
		<div>
			<p>Number: {details.id}</p>
			<p>
				Type: {details.types.map((typeEntry) => typeEntry.type.name).join(", ")}
			</p>
		</div>
	);
};

export default PokemonDetails;
