import './App.css';
import { useVehicleData } from './hooks/useVehicleData';
import { VehicleCard } from './components/VehicleCard';
import type { VehicleFilters } from './types/vehicle';
import { useMemo, useState } from 'react';
import { FilterPanel } from './components/VehicleFilters';

function App() {
  const { data = [], isLoading } = useVehicleData();

  const defaultFilters: VehicleFilters = {
    maxPrice: 200000,
    minRange: 0,
    bodyType: 'All',
  };

  const [filters, setFilters] = useState<VehicleFilters>(defaultFilters);

  const uniqueBodyTypes = useMemo(() => {
    const types = data.map((v) => v.bodyType).filter(Boolean);
    return Array.from(new Set(types));
  }, [data]);

  const filteredVehicles = useMemo(() => {
    return data.filter((vehicle) => {
      const matchesPrice = vehicle.lowestPrice <= filters.maxPrice;
      const matchesRange = vehicle.rangeKm >= filters.minRange;
      const matchesBodyType =
        filters.bodyType === 'All' ||
        vehicle.bodyType.toLowerCase() === filters.bodyType.toLowerCase();

      return matchesPrice && matchesRange && matchesBodyType;
    });
  }, [data, filters]);

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
          Loading EV database...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10 space-y-2 border-b pb-6">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">EV Finder</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Find the perfect Used EV for you
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            (Prices are Autotrader's historical lowest price)
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 items-start">
          <aside className="lg:col-span-1 lg:sticky lg:top-8 z-10">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              availableBodyTypes={uniqueBodyTypes}
            />
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold tracking-tight">
                Available Models ({filteredVehicles.length})
              </h2>
            </div>

            {filteredVehicles.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/30 bg-muted/20 p-16 text-center">
                <p className="text-sm font-semibold text-foreground">No matches found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
