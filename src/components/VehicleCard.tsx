import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-200 border-muted-foreground/20">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardDescription className="text-xs font-semibold tracking-wider uppercase">
              {vehicle.year}
            </CardDescription>
            <CardTitle className="text-xl font-bold mt-1 leading-tight">
              {vehicle.brand} {vehicle.model}
            </CardTitle>
            <Badge variant="secondary" className="mt-3">
              {vehicle.bodyType}
            </Badge>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-muted-foreground font-medium block mb-1">
              Lowest Price
            </span>
            <span className="text-2xl font-black text-foreground tracking-tight">
              ${vehicle.lowestPrice}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 grow">
        <div className="grid grid-cols-2 gap-3 p-4 bg-muted/40 rounded-lg text-center border border-muted/50">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium">Range</span>
            <span className="text-lg font-bold text-foreground">{vehicle.rangeKm} km</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium">Battery</span>
            <span className="text-lg font-bold text-foreground">
              {vehicle.batteryCapacityKwh} kWh
            </span>
          </div>
        </div>

        <Separator />

        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">Drive:</span>
            <span className="font-semibold text-foreground text-right">{vehicle.drivetrain}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">0-60:</span>
            <span className="font-semibold text-foreground text-right">{vehicle.zeroToSixty}s</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">Power:</span>
            <span className="font-semibold text-foreground text-right">
              {vehicle.horsepower} hp
            </span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">Torque:</span>
            <span className="font-semibold text-foreground text-right">{vehicle.torque} lbft</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">Seats:</span>
            <span className="font-semibold text-foreground text-right">{vehicle.seats}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-muted-foreground">Storage:</span>
            <span className="font-semibold text-foreground text-right">
              {vehicle.storage} cubic feet
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
