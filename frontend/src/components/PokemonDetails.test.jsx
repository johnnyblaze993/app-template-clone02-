import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";

// Mock axios
jest.mock("axios");

describe("PokemonDetails", () => {
	it("check bulbasurars types and makes sure that it is a duel type", async () => {
		// Set up mock response
		const mockResponse = {
			data: {
				abilities: [
					{
						is_hidden: false,
						slot: 1,
						ability: {
							name: "overgrow",
							url: "https://pokeapi.co/api/v2/ability/65/",
						},
					},
					{
						is_hidden: true,
						slot: 3,
						ability: {
							name: "chlorophyll",
							url: "https://pokeapi.co/api/v2/ability/34/",
						},
					},
				],
				types: [
					{
						slot: 1,
						type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
					},
					{
						slot: 2,
						type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
					},
				],
				base_experience: 64,
				height: 7,
				weight: 69,
				name: "bulbasaur",
				// ... other fields
			},
		};
		axios.get.mockResolvedValue(mockResponse);

		// Render the component
		const { getByText } = render(
			<PokemonDetails url="https://pokeapi.co/api/v2/pokemon/1/" />
		);

		// Wait for the data to be displayed
		await waitFor(() => {
			const typesElement = getByText(/grass, poison/);
			const typesText = typesElement.textContent;
			const types = typesText.split(",").map((type) => type.trim());
			expect(typesElement).toBeInTheDocument();
			expect(types).toHaveLength(2);
		});
	});
	it("displays loding message when no data is available", () => {
		render(<PokemonDetails url="falseURLLol" />);
		expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();
	});
});
