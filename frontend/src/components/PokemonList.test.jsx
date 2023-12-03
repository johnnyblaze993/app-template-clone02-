/* eslint-disable jest/no-commented-out-tests */

import React from "react";
import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList";
import { fireEvent, waitFor } from "@testing-library/dom";

describe("PokemonList", () => {
	it("renders Kanto Region text", () => {
		render(<PokemonList />);
		expect(screen.getByText(/Kanto Region/i)).toBeInTheDocument();
	});

	it("renders Johto Region text", () => {
		render(<PokemonList />);
		expect(screen.getByText(/Johto Region/i)).toBeInTheDocument();
	});

	it("renders Hoenn Region text", () => {
		render(<PokemonList />);
		expect(screen.getByText(/Hoenn Region/i)).toBeInTheDocument();
	});

	//Kanto
	it("loads bulbasuar when Kanto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Kanto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[0]).toHaveTextContent("bulbasaur"); // Check the first item for 'bulbasaur'
		});
	});

	it("loads squirtle when Kanto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Kanto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[6]).toHaveTextContent("squirtle"); // Check the first item for 'squirtle'
		});
	});

	it("loads charmander when Kanto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Kanto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[3]).toHaveTextContent("charmander"); // Check the first item for 'charmander'
		});
	});

	//Johto
	it("loads chikorita when Johto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Johto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[0]).toHaveTextContent("chikorita"); // Check the first item for 'chikorita'
		});
	});

	it("loads cyndaquil when Johto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Johto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[3]).toHaveTextContent("cyndaquil"); // Check the first item for 'cyndaquil'
		});
	});

	it("loads totodile when Johto region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Johto Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[6]).toHaveTextContent("totodile"); // Check the first item for 'totodile'
		});
	});

	//Hoenn
	it("loads treecko when Hoenn region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Hoenn Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[0]).toHaveTextContent("treecko"); // Check the first item for 'treecko'
		});
	});

	it("loads torchic when Hoenn region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Hoenn Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[3]).toHaveTextContent("torchic"); // Check the first item for 'torchic'
		});
	});

	it("loads mudkip when Hoenn region selected", async () => {
		render(<PokemonList />);
		fireEvent.click(screen.getByText(/Hoenn Region/i));

		await waitFor(() => {
			const items = screen.getAllByRole("pokemon");
			expect(items[6]).toHaveTextContent("mudkip"); // Check the first item for 'mudkip'
		});
	});
});
