import Papa from 'papaparse';
import type { Vehicle } from '../types/vehicle';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7IkL6sNkpOuQIMnJ3KqPuwqvKLIQNJyqCE4PzfAYoEzA3yMEx2jRp1VxY4QjEDPUToQtQGtzDeuDb/pub?gid=1313510290&single=true&output=csv';


export const getEvData = (): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<any>(GOOGLE_SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const trimmedVehicles: Vehicle[] = results.data.map((row: any, index: number) => {
            return {
                id: index,
                year: row.year,
                brand: row.brand,
                model: row.model,
                lowestPrice: row.lowestPrice,
                rangeKm: row.rangeKm,
                batteryCapacityKwh: row.batteryCapacityKwh,
                bodyType: row.bodyType,
                storage: row.storage,
                seats: row.seats,
                drivetrain: row.drivetrain,
                horsepower: row.horsepower,
                torque: row.torque,
                zeroToSixty: row.zeroToSixty,
                weightKg: row.weightKg,
            };
        });
        resolve(trimmedVehicles); 
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};