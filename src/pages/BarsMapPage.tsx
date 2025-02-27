import React, { useEffect, useState } from "react";
import MapCard from "../components/Map/MapCard";

interface Bar {
  id: string;
  name: string;
  localisationX: number;
  localisationY: number;
}

const BarsMapPage: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch("http://localhost:3000/bar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des bars.");
        }
        const data: Bar[] = await response.json();
        setBars(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="flex flex-col items-center p-4">
      <h2>tiak</h2>
      {bars.length > 0 ? (
        <MapCard 
          lat={bars[0].localisationX} 
          lng={bars[0].localisationY} 
          markers={bars} 
        />
      ) : (
        <p className="text-center text-gray-500">Aucun bar trouvé.</p>
      )}
    </div>
  );
};

export default BarsMapPage;
