import { useEffect, useState } from 'react'
import './App.css'
import { getEvData } from './services/evApi'
import type { Vehicle } from './types/vehicle';

function App() {
  const [data, setData] = useState<Vehicle[]>([]);

  useEffect(() => {
    getEvData()
      .then((results: any) => {
        setData(results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
    </>
  )
}

export default App
