import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
	const [digimons, setDigimons] = useState([]);

	const fetchDigimons = () => {
		axios
			.get("http://localhost:8080/digimon")
			.then((response) => {
				setDigimons(response.data);
			})
			.then((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<h2 style={{ textAlign: "center", marginBottom: "20px" }}>
				Compose App!
			</h2>
			<button
				style={{
					display: "block",
					margin: "0 auto 20px",
					padding: "10px 20px",
					backgroundColor: "#4CAF50",
					color: "white",
					borderRadius: "5px",
					border: "none",
					cursor: "pointer",
				}}
				onClick={fetchDigimons}
			>
				Load Test Data
			</button>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{digimons.map((digimon) => (
					<div
						key={digimon.id}
						style={{
							border: "1px solid #ddd",
							margin: "10px",
							padding: "10px",
							width: "200px",
							borderRadius: "10px",
							boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
							transition: "0.3s",
						}}
					>
						<h3 style={{ textAlign: "center", marginBottom: "10px" }}>
							{digimon.name}
						</h3>
						<p style={{ textAlign: "center", marginBottom: "5px" }}>
							Type: {digimon.type}
						</p>
						<p style={{ textAlign: "center", marginBottom: "5px" }}>
							Number: {digimon.digimonNumber}
						</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
