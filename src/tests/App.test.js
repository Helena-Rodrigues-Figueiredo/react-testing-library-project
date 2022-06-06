import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('Ao clicar no link "Home" é redirecionado para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar no link "About" é redirecionado para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar no link "Favorites" é redirecionado para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Ao digitar uma URL desconhecida, redireciona para a págita "Not Found""', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/urlqualquer');

    const notFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });
});
