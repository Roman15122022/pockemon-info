import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithTheme } from '../../../test/renderWithTheme';
import { PaginationBar } from './PaginationBar';

describe('PaginationBar', () => {
  it('disables previous on the first page and calls next', async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    renderWithTheme(
      <PaginationBar
        page={1}
        totalCount={48}
        visibleCount={24}
        loading={false}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    expect(screen.getByText('Showing 24 of 48 results · page 1 / 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPrevious).not.toHaveBeenCalled();
    expect(onNext).toHaveBeenCalledOnce();
  });
});
