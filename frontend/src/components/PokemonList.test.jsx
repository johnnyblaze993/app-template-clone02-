
import React from "react";
import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';
import { fireEvent, waitFor } from '@testing-library/dom';

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

  // it('loads Kanto region Pokemons when selected', async () => {
  //   render(<PokemonList />);
  //   fireEvent.click(screen.getByText(/Kanto Region/i)); // Simulate clicking the Kanto region accordion
  //   await waitFor(() => {
  //     // Assuming the accordion expands and fetches data, check if it renders the expected number of Pokemons
  //     const expectedNumberOfPokemons = 151; // Number of Pokemons in Kanto region
  //     expect(screen.getAllByTestId('pokemon-item').length).toBe(expectedNumberOfPokemons);
  //   });
  // });

  it('loads bulbasuar when Kanto region selected', async () => {
    render(<PokemonList />);
    fireEvent.click(screen.getByText(/Kanto Region/i)); 
  
    await waitFor(() => {
      const items = screen.getAllByRole('pokemon'); 
      expect(items[0]).toHaveTextContent('bulbasaur'); // Check the first item for 'bulbasaur'
    });
  });

  it('loads squirtle when Kanto region selected', async () => {
    render(<PokemonList />);
    fireEvent.click(screen.getByText(/Kanto Region/i));
  
    await waitFor(() => {
      const items = screen.getAllByRole('pokemon'); 
      expect(items[6]).toHaveTextContent('squirtle'); // Check the first item for 'squirtle'
    });
  });

  it('loads charmander when Kanto region selected', async () => {
    render(<PokemonList />);
    fireEvent.click(screen.getByText(/Kanto Region/i)); 
  
    await waitFor(() => {
      const items = screen.getAllByRole('pokemon'); 
      expect(items[3]).toHaveTextContent('charmander'); // Check the first item for 'charmander'
    });
  });
});
