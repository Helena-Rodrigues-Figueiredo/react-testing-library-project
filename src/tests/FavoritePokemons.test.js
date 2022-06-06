import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemonsljs', () => {
  it('Verifica se é exibida a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);

    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se são exibidos todos os cards favoritados', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const getNamePokemon = screen.getByTestId('pokemon-name').textContent;

    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const findPokemonName = screen.getByText(getNamePokemon);
    expect(findPokemonName).toBeInTheDocument();
  });
});
