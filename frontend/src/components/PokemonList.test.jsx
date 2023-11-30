
import React from "react";
import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';

describe('PokemonList', () => {
  
  it('renders Kanto Region text', () => {
    render(<PokemonList />);
    expect(screen.getByText(/Kanto Region/i)).toBeInTheDocument();
  });

  it('renders Johto Region text', () => {
    render(<PokemonList />);
    expect(screen.getByText(/Johto Region/i)).toBeInTheDocument();
  });

  it('renders Hoenn Region text', () => {
    render(<PokemonList />);
    expect(screen.getByText(/Hoenn Region/i)).toBeInTheDocument();
  });
});
