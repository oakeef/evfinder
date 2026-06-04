import { describe, it, expect, vi } from 'vitest';
import { FilterPanel } from './VehicleFilters';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_FILTERS } from './VehicleFilters';

describe('FilterPanel', () => {
  const mockOnChange = vi.fn();
  const mockFilters = DEFAULT_FILTERS;

  it('calls onChange with reset values when the Reset button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <FilterPanel
        filters={{ maxPrice: 50000, minRange: 300, bodyType: 'SUV' }}
        onChange={mockOnChange}
        availableBodyTypes={['SUV', 'Sedan']}
      />
    );

    const resetButton = screen.getByRole('button', { name: /reset filters/i });
    await user.click(resetButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);

    const updaterFunction = mockOnChange.mock.calls[0][0];
    expect(updaterFunction()).toEqual(mockFilters);
  });
});
