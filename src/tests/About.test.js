import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testando o componente About.js', () => {
  it('Verifica se contém um heading h2 como o texto "About Pokedéx"', () => {
    render(<About />);

    const headingPokedex = screen.getByRole('heading',
      { name: 'About Pokédex', level: 2 });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Verifica contém dois parágrafos como o texto sobre Pokédex"', () => {
    render(<About />);

    const twoParagraphs = screen.getAllByText(/Pokémons/i);
    expect(twoParagraphs).toHaveLength(2);
  });

  it('Verifica se contém imagem com a uma URL específica', () => {
    render(<About />);

    const image = screen.getByAltText('Pokédex');
    expect(image.src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
