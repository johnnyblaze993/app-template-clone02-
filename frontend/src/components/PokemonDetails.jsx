/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { pokemonBGColors } from "../constants/constants";
import Button from "@mui/material/Button";
import axios from "axios";
import {
	Modal,
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

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
			try {
				const response = await axios.get(url); // Using axios to fetch data
				setDetails(response.data);
			} catch (error) {
				console.error("Error fetching Pokemon details:", error);
				// Handle error appropriately
			}
		};

		fetchDetails();
	}, [url]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const createData = (name, value) => {
		return { name, value };
	};

	const getTableRows = (details) => {
		if (!details || !details.stats) return [];
		// This maps over the stats array and creates a row for each base stat
		const rows = details.stats.map((stat) =>
			createData(stat.stat.name, stat.base_stat)
		);

		// Additional rows for height, weight, and average stats
		rows.push(createData("Height", details.height));
		rows.push(createData("Weight", details.weight));
		rows.push(
			createData("Average Stats", calculateAverageStats(details.stats))
		);
		return rows;
	};

	const calculateAverageStats = (stats) => {
		if (!stats) return 0;
		const total = stats.reduce((acc, curr) => acc + curr.base_stat, 0);
		return (total / stats.length).toFixed(2);
	};

	if (!details) {
		return <p>Loading details...</p>;
	}

	const name = details.name ? details.name.toUpperCase() : "Unknown";

	const rows = getTableRows(details);

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

	const backgroundStyle =
		details.types.length === 2
			? `linear-gradient(to right, ${
					pokemonBGColors[details.types[0].type.name]
			  }, ${pokemonBGColors[details.types[1].type.name]})`
			: pokemonBGColors[details.types[0].type.name];

	return (
		<div>
			<div
				data-testid="open-modal"
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
				<p data-testid="types-display">
					{details.types.map((typeEntry) => typeEntry.type.name).join(", ")}
				</p>
			</div>

			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Button
						onClick={handleClose}
						style={{ position: "absolute", top: 8, right: 8 }}
					>
						Close
					</Button>
					<Typography id="modal-title" variant="h6">
						{name}
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
					<TableContainer component={Paper} style={{ marginTop: "20px" }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Stat</TableCell>
									<TableCell align="right">Value</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow key={row.name}>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.value}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Modal>
		</div>
	);
};

PokemonDetails.propTypes = {
	url: PropTypes.string.isRequired,
};

export default PokemonDetails;
