import { useEffect, useState } from 'react';
import './App.css';
import { getEvData } from './services/evApi';
import type { Vehicle } from './types/vehicle';
import { VehicleCard } from './components/VehicleCard';

function App() {
  const [data, setData] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getEvData()
      .then((results: any) => {
        setData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading vehicles...</div>;

  return (
    <>
      {data.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </>
  );
}

export default App;
