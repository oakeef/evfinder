import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { VehicleFilters } from '../types/vehicle';

interface VehicleFiltersProps {
  filters: VehicleFilters;
  onChange: (updater: (prev: VehicleFilters) => VehicleFilters) => void;
  availableBodyTypes: string[];
}

export const DEFAULT_FILTERS: VehicleFilters = { maxPrice: 200000, minRange: 0, bodyType: 'All' };

export function FilterPanel({ filters, onChange, availableBodyTypes }: VehicleFiltersProps) {
  return (
    <Card className="bg-card shadow-sm border-muted-foreground/20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold tracking-tight">Filter Vehicles</CardTitle>
      </CardHeader>

      <CardContent className="space-y-7">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <label className="font-medium text-foreground">Max Budget</label>
            <span className="font-bold text-primary">${filters.maxPrice}</span>
          </div>
          <Slider
            min={0}
            max={200000}
            step={2000}
            value={[filters.maxPrice]}
            onValueChange={(values) => onChange((prev) => ({ ...prev, maxPrice: values[0] }))}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <label className="font-medium text-foreground">Minimum Range</label>
            <span className="font-bold text-primary">{filters.minRange} km</span>
          </div>
          <Slider
            min={0}
            max={1000}
            step={50}
            value={[filters.minRange]}
            onValueChange={(values) => onChange((prev) => ({ ...prev, minRange: values[0] }))}
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground block">Body Style</label>
          <Select
            value={filters.bodyType}
            onValueChange={(value) => onChange((prev) => ({ ...prev, bodyType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a body style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Body Styles</SelectItem>
              {availableBodyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          className="w-full py-2.5 mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-semibold text-sm transition-colors shadow-sm"
          onClick={() => onChange(() => DEFAULT_FILTERS)}
        >
          Reset Filters
        </button>
      </CardContent>
    </Card>
  );
}
