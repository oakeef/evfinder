import './App.css';
import { useVehicleData } from './hooks/useVehicleData';
import { VehicleCard } from './components/VehicleCard';

function App() {
const { data = [], isLoading } = useVehicleData();

  if (isLoading) return <div>Loading vehicles...</div>;

  return (
    <>
      <h1>EV Finder</h1>
      <h3>Find the perfect used EV for you</h3>
      {data.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </>
  );
}

export default App;
