import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  it('Verifica se possui um heading como o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const headingPokedex = screen.getByRole('heading',
      { name: 'Encountered pokémons', level: 2 });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Verifica se quando o botão é clicado, aparece o próximo pokémon', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

    const pokemonNext = screen.getByText(/charmander/i);

    expect(pokemonNext).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(1);
  });

  it('Verifica se possui os botões de filtro', () => {
    renderWithRouter(<App />);

    const type = ['All', 'Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    type.forEach((element) => {
      const elemento = screen.getAllByTestId('pokemon-type-button', { name: element });
      expect(elemento[0]).toBeInTheDocument();

      const clickButton = screen.getByRole('button', { name: /psychic/i });
      userEvent.click(clickButton);

      const typePokemon = screen.getByTestId('pokemon-type', { name: /psychic/i });
      expect(typePokemon).toBeInTheDocument(typePokemon);

      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(buttonNext);

      expect(typePokemon).toBeInTheDocument();

      const buttonAll = screen.getByRole('button', { name: /all/i });

      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('Verifica se a Pokédex contém um botão de reset', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);

    const firstPokemon = screen.getByTestId('pokemon-name', { name: /pikachu/i });
    expect(firstPokemon).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);

    const secondPokemon = screen.getByTestId('pokemon-name', { name: /charmander/i });
    expect(secondPokemon).toBeInTheDocument();
  });
});
