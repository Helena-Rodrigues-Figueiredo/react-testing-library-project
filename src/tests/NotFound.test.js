import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testando o componente NotFound.js', () => {
  it('Verifica se contém um heading com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);

    const heading = screen
      .getByRole('heading', { name: 'Page requested not found Crying emoji' });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se contém imagem com a uma URL específica', () => {
    render(<NotFound />);

    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src)
      .toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
