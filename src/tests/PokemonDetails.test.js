import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tentando o componente PokemonDetails.js', () => {
  it('Verifica se informações do pokémon aparecem na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const detailsPokemon = screen.getByRole('heading',
      { name: 'Pikachu Details' });

    expect(detailsPokemon).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });

    expect(summary).toBeInTheDocument();
  });

  it('Verifica existe seção com os mapas', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const heading = screen.getByRole('heading',
      { name: 'Game Locations of Pikachu' });

    expect(heading).toBeInTheDocument();

    const kantoForest = screen.getByText('Kanto Viridian Forest');
    const kantoPlant = screen.getByText('Kanto Power Plant');
    const mapImages = screen.getAllByAltText('Pikachu location');

    expect(kantoForest).toBeInTheDocument();
    expect(kantoPlant).toBeInTheDocument();
    expect(mapImages).toHaveLength(2);
    expect(mapImages[0].src).toContain('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(mapImages[1].src).toContain('https://pwo-wiki.info/images/5/5b/Pp.gif');

    const paragraph = screen.getByText(/this intelligent Pokémon/i);

    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se é possível favoritar um pokémon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox', { checked: false });

    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const checkboxChecked = screen.getByRole('checkbox', { checked: true });
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    const label = screen.getByLabelText('Pokémon favoritado?');

    expect(checkboxChecked).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
