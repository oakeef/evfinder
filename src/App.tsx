import './App.css';
import { useVehicleData } from './hooks/useVehicleData';
import { VehicleCard } from './components/VehicleCard';
import type { VehicleFilters } from './types/vehicle';
import { useMemo, useState } from 'react';
import { FilterPanel } from './components/VehicleFilters';

function App() {
  const { data = [], isLoading } = useVehicleData();

  const [filters, setFilters] = useState<VehicleFilters>({
    maxPrice: 150000,
    minRange: 0,
    bodyType: 'All',
  });

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

  if (isLoading) return <div>Loading vehicles...</div>;

  return (
    <>
      <h1>EV Finder</h1>
      <h3>Find the perfect used EV for you</h3>

      <FilterPanel filters={filters} onChange={setFilters} availableBodyTypes={uniqueBodyTypes} />

      {filteredVehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </>
  );
}

export default App;
