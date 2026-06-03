export interface Vehicle {
  id: number;
  year: number;
  brand: string;
  model: string;
  lowestPrice: number;
  rangeKm: number;
  batteryCapacityKwh: number;
  bodyType: string;
  storage: number;
  seats: number;
  drivetrain: string;
  horsepower: number;
  torque: number;
  zeroToSixty: number;
  weightKg: number;
}

export interface VehicleFilters {
  maxPrice: number;
  minRange: number;
  bodyType: string;
}
