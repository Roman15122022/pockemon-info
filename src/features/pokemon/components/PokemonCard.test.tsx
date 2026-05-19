import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithTheme } from '../../../test/renderWithTheme';
import { bulbasaurMock } from '../testing/pokemonMock';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  it('renders pokemon summary and opens details from the card', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onToggleFavorite = vi.fn();

    renderWithTheme(
      <PokemonCard
        pokemon={bulbasaurMock}
        favorite={false}
        onOpen={onOpen}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bulbasaur' })).toBeInTheDocument();
    expect(screen.getByText('0.7 m · 6.9 kg')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
    expect(screen.getByText('Poison')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /#001/i }));

    expect(onOpen).toHaveBeenCalledWith(bulbasaurMock);
  });

  it('toggles favorite without opening details', async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onToggleFavorite = vi.fn();

    renderWithTheme(
      <PokemonCard
        pokemon={bulbasaurMock}
        favorite={false}
        onOpen={onOpen}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Like' }));

    expect(onToggleFavorite).toHaveBeenCalledWith(bulbasaurMock);
    expect(onOpen).not.toHaveBeenCalled();
  });
});
