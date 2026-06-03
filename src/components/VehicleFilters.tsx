import type { VehicleFilters } from '../types/vehicle';

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onChange: (updater: (prev: VehicleFilters) => VehicleFilters) => void;
  availableBodyTypes: string[];
}

export function FilterPanel({ filters, onChange, availableBodyTypes }: VehicleFiltersProps) {
  return (
    <div>
      <h2>Filter Vehicles</h2>

      <div>
        <label>Max Budget: ${filters.maxPrice}</label>
        <input
          type="range"
          min={0}
          max={150000}
          step={2000}
          value={filters.maxPrice}
          onChange={(e) => onChange((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
        />
      </div>

      <div>
        <label>Minimum Range: {filters.minRange} km</label>
        <input
          type="range"
          min={0}
          max={1000}
          step={50}
          value={filters.minRange}
          onChange={(e) => onChange((prev) => ({ ...prev, minRange: Number(e.target.value) }))}
        />
      </div>

      <div>
        <label>Body Style: </label>
        <select
          value={filters.bodyType}
          onChange={(e) => onChange((prev) => ({ ...prev, bodyType: e.target.value }))}
        >
          <option value="All">All Body Styles</option>
          {availableBodyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => onChange(() => ({ maxPrice: 150000, minRange: 0, bodyType: 'All' }))}>
        Reset Filters
      </button>
    </div>
  );
}
