import React, { useEffect, useState } from "react";
import MapComponent from "../components/MapComponent";

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Carte des Bars</h2>
      {bars.length > 0 ? (
        <MapComponent 
          lat={bars[0].localisationX} 
          lng={bars[0].localisationY} 
          markers={bars} 
        />
      ) : (
        <p>Aucun bar trouvé.</p>
      )}
    </div>
  );
};

export default BarsMapPage;
