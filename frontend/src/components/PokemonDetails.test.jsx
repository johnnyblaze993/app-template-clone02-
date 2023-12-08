/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable no-unused-vars */
import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";
import { act } from "react-dom/test-utils";

// Mock axios
jest.mock("axios");

describe("PokemonDetails", () => {
	const mockResponse = {
		data: {
			// Include 'stats' in your mock response
			stats: [
				{ base_stat: 45, stat: { name: "speed" } },
				// ... include other stats as needed
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
			// ... other data fields
		},
	};

	beforeEach(() => {
		axios.get.mockResolvedValue(mockResponse);
	});

	// it("fetches and displays height and weight", async () => {
	// 	render(<PokemonDetails url="https://pokeapi.co/api/v2/pokemon/ditto" />);

	// 	// Simulate user action to open the modal
	// 	fireEvent.click(screen.getByTestId("open-modal"));

	// 	// Wait for the component to update with the fetched data
	// 	await waitFor(() => {
	// 		const heightElement = screen.getByText(/Height:/i);
	// 		const weightElement = screen.getByText(/Weight:/i);
	// 		expect(heightElement).toHaveTextContent("Height: 3"); // Make sure this text matches exactly
	// 		expect(weightElement).toHaveTextContent("Weight: 40"); // Make sure this text matches exactly
	// 	});
	// });

	it("check bulbasurars types and makes sure that it is a duel type", async () => {
		// Set up mock response
		const mockResponse = {
			data: {
				name: "Bulbasaur", // Make sure this is defined
				// ... other data fields
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
			},
		};
		axios.get.mockResolvedValue(mockResponse);

		// Use `act` to ensure all state updates and effects are processed
		await act(async () => {
			render(<PokemonDetails url="https://pokeapi.co/api/v2/pokemon/1/" />);
		});

		await act(async () => {
			fireEvent.click(screen.getByTestId("open-modal"));
		});

		// Wait for the mock data to be loaded and displayed
		await waitFor(() => {
			// Replace this with a check that confirms the data is displayed
			const typesElement = screen.getByTestId("types-display");
			expect(typesElement).toHaveTextContent("grass, poison");
		});
	});

	it("displays loding message when no data is available", () => {
		render(<PokemonDetails url="falseURLLol" />);
		expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();
	});
});
