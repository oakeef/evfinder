import type { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div>
      <div>
        <span>{vehicle.year}</span>
        <h3>
          {vehicle.brand} {vehicle.model}
        </h3>
        <p>Body Type: {vehicle.bodyType}</p>
      </div>

      <div>
        <p>Current Lowest Price: ${vehicle.lowestPrice}</p>
      </div>

      <div>
        <p>Range: {vehicle.rangeKm} km</p>
        <p>Battery: {vehicle.batteryCapacityKwh} kWh</p>
      </div>

      <ul>
        <li>Drivetrain: {vehicle.drivetrain}</li>
        <li>0-60 mph: {vehicle.zeroToSixty}s</li>
        <li>Horsepower: {vehicle.horsepower} hp</li>
        <li>Torque: {vehicle.torque} lbft</li>
        <li>Seats: {vehicle.seats}</li>
        <li>Storage: {vehicle.storage} Cubic Feet</li>
        <li>Weight: {vehicle.weightKg} kg</li>
      </ul>
    </div>
  );
}
