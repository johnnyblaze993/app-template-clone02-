/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { pokemonBGColors } from "../constants/constants";
import { CircularProgress, Modal, Box, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const PokemonDetails = ({ url }) => {
	const [details, setDetails] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchDetails = async () => {
			const response = await fetch(url);
			const data = await response.json();
			setDetails(data);
		};

		fetchDetails();
	}, [url]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	if (!details) {
		return <p>Loading details...</p>;
	}

	const backgroundStyle =
		details.types.length === 2
			? `linear-gradient(to right, ${
					pokemonBGColors[details.types[0].type.name]
			  }, ${pokemonBGColors[details.types[1].type.name]})`
			: pokemonBGColors[details.types[0].type.name];

	const renderBaseStats = (stats) => {
		return stats.map((statInfo) => (
			<Typography key={statInfo.stat.name}>
				{`${statInfo.stat.name.toUpperCase()}: ${statInfo.base_stat}`}
			</Typography>
		));
	};

	const imageContainerStyle = {
		display: "flex",
		justifyContent: "center",
		gap: "10px",
		margin: "10px 0",
	};

	const imageStyle = {
		transition: "transform 0.3s ease-in-out",
		height: "100px",
		objectFit: "contain",
		flexShrink: 0,
	};

	return (
		<div>
			<div
				onClick={handleOpen}
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
					display: "inline-block",
					width: "100%",
				}}
			>
				<p>
					{details.types.map((typeEntry) => typeEntry.type.name).join(", ")}
				</p>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-title" variant="h6">
						{details.name.toUpperCase()}
					</Typography>
					<div style={imageContainerStyle}>
						{details.sprites && (
							<>
								<img
									src={details.sprites.front_default}
									alt={`${details.name} front`}
									style={{
										...imageStyle,
										zIndex: 1,
										transform: "scale(1)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "scale(1.2)";
										e.currentTarget.style.zIndex = 2;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "scale(1)";
										e.currentTarget.style.zIndex = 1;
									}}
								/>
								<img
									src={details.sprites.back_default}
									alt={`${details.name} back`}
									style={{
										...imageStyle,
										transform: "scale(0.8)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.transform = "scale(1.2)";
										e.currentTarget.previousSibling.style.transform =
											"scale(0.8)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = "scale(0.8)";
										e.currentTarget.previousSibling.style.transform =
											"scale(1)";
									}}
								/>
							</>
						)}
					</div>
					<Typography id="modal-description" sx={{ mt: 2 }}>
						Height: {details.height} <br />
						Weight: {details.weight} <br />
						<br />
						Base Stats:
						{details.stats ? (
							renderBaseStats(details.stats)
						) : (
							<CircularProgress />
						)}
						<br />
						Total Base Stats:{" "}
						{details.stats
							? details.stats.reduce((acc, curr) => acc + curr.base_stat, 0)
							: null}
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

PokemonDetails.propTypes = {
	url: PropTypes.string.isRequired,
};

export default PokemonDetails;
