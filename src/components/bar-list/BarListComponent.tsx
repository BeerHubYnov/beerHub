import { useEffect, useState } from "react";
import "./BarListComponent.css";
import BarCard from "./BarCard";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

const BarListComponent: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch("http://localhost:3000/bar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des bars.");
        }
        const data = await response.json();
        setBars(data);
      } catch (error) {
        setErrorMessage("Impossible de charger les bars.");
      }
    };

    fetchBars();
  }, []);

  return (
    <div className="bar-list-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="bar-list">
        {bars.length > 0 ? (
          bars.map((bar) => <BarCard key={bar.id} bar={bar} />) 
        ) : (
          <p>Chargement des bars...</p>
        )}
      </div>
    </div>
  );
};

export default BarListComponent;
