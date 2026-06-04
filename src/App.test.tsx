import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { useVehicleData } from './hooks/useVehicleData';
vi.mock('./hooks/useVehicleData');

describe('App Integration', () => {
  const mockVehicles = [
    {
      id: '1',
      brand: 'Tesla',
      model: 'Model 3',
      lowestPrice: 35000,
      rangeKm: 400,
      bodyType: 'Sedan',
    },
    {
      id: '2',
      brand: 'Ford',
      model: 'F-150 Lightning',
      lowestPrice: 65000,
      rangeKm: 380,
      bodyType: 'Truck',
    },
  ];

  it('renders the loading spinner when data is fetching', () => {
    vi.mocked(useVehicleData).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(<App />);

    expect(screen.getByText('Loading EV database...')).toBeInTheDocument();
  });

  it('renders the application and displays the fetched vehicles', () => {
    vi.mocked(useVehicleData).mockReturnValue({
      data: mockVehicles,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<App />);

    expect(screen.getByRole('heading', { name: 'EV Finder' })).toBeInTheDocument();
    expect(screen.getByText('Tesla Model 3')).toBeInTheDocument();
    expect(screen.getByText('Ford F-150 Lightning')).toBeInTheDocument();
    expect(screen.getByText('Available Models (2)')).toBeInTheDocument();
  });

  it('shows an empty state if no vehicles are passed in', () => {
    vi.mocked(useVehicleData).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<App />);

    expect(screen.getByText('No matches found')).toBeInTheDocument();
    expect(screen.getByText('Available Models (0)')).toBeInTheDocument();
  });
});
