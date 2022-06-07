import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando componente Pokemon.js', () => {
  it('Verifica se é renderizado as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    const type = screen.getAllByText(/electric/i);
    const weight = screen.getByText(/average weight: 6.0 kg/i);
    const image = screen.getByAltText(/pikachu sprite/i);

    expect(pikachu).toBeInTheDocument();
    expect(type).toHaveLength(2);
    expect(weight).toBeInTheDocument();
    expect(image.src)
      .toContain('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });

  it('Verifica se contém link para exibir detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se pokémon favoritado possui ícone de estrela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);

    const favorite = screen.getByAltText('Pikachu is marked as favorite');

    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toContain('/star-icon.svg');
  });
});
