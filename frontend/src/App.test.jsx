
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./App.css";

describe("App", () => {
    it("renders Test PKM Data text", () => {
        render(<App />);
        expect(screen.getByText(/Test PKM Data/i)).toBeInTheDocument();
    });
});