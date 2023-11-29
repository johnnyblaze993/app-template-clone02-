import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import PokemonList from './PokemonList';


jest.mock('axios');

describe('PokemonList', () => {
  it('renders correctly', () => {
    render(<PokemonList />);
    expect(screen.getByText(/Kanto Region/i)).toBeInTheDocument();
  });

  it('loads pokemons when a region is selected', async () => {
    axios.get.mockResolvedValue({
      data: { results: [{ name: 'bulbasaur', url: 'some_url' }] },
    });

    render(<PokemonList />);
    fireEvent.click(screen.getByText(/Kanto Region/i));

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  // ... other tests ...
});
