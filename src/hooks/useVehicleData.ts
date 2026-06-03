import { useQuery } from '@tanstack/react-query';
import { getEvData } from '../services/evApi.ts';
import type { Vehicle } from '../types/vehicle.ts';

export function useVehicleData() {
  return useQuery<Vehicle[], Error>({
    queryKey: ['vehicleData'],
    queryFn: getEvData,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}