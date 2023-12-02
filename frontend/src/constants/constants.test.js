import { REGION_RANGES } from "./constants";
import { pokemonBGColors } from "./constants";

describe("REGION_RANGES constant", () => {
	it("should have the correct range for Kanto", () => {
		expect(REGION_RANGES.Kanto).toEqual({ start: 1, end: 151 });
	});

	it("should have the correct range for Johto", () => {
		expect(REGION_RANGES.Johto).toEqual({ start: 152, end: 251 });
	});

	it("should have the correct range for Hoenn", () => {
		expect(REGION_RANGES.Hoenn).toEqual({ start: 252, end: 386 });
	});

	it("should have keys for all expected regions", () => {
		const expectedRegions = ["Kanto", "Johto", "Hoenn"];
		expectedRegions.forEach((region) => {
			expect(REGION_RANGES).toHaveProperty(region);
		});
	});
});

describe("pokemonBGColors constant", () => {
	it("should have the correct color codes for each type", () => {
		const expectedColors = {
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

		expect(pokemonBGColors).toEqual(expectedColors);
	});

	it("should contain specific types", () => {
		const types = [
			"normal",
			"fire",
			"water",
			"electric",
			"grass",
			"ice",
			"fighting",
			"poison",
			"ground",
			"flying",
			"psychic",
			"bug",
			"rock",
			"ghost",
			"dragon",
			"dark",
			"steel",
			"fairy",
		];
		types.forEach((type) => {
			expect(pokemonBGColors).toHaveProperty(type);
			expect(pokemonBGColors).not.toHaveProperty("poop");
		});
	});

	it("should have the correct number of types", () => {
		expect(Object.keys(pokemonBGColors).length).toEqual(18);
	});

	it("should contain valid hex color codes", () => {
		const hexRegex = /^#[0-9A-F]{6}$/i;
		Object.values(pokemonBGColors).forEach((color) => {
			expect(color).toMatch(hexRegex);
		});
	});
});
