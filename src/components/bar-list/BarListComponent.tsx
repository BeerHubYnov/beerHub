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


// Données fictives (mock)
// const mockBars: Bar[] = [
//     {
//       id: "1",
//       name: "Le Bar du Coin",
//       description: "Un bar chaleureux avec une ambiance conviviale.",
//       happyHoure: "17h - 19h",
//       localisationX: 48.8566,
//       localisationY: 2.3522,
//     },
//     {
//       id: "2",
//       name: "La Cave à Bière",
//       description: "Un large choix de bières artisanales.",
//       happyHoure: "18h - 20h",
//       localisationX: 48.8606,
//       localisationY: 2.3376,
//     },
//     {
//         id: "3",
//         name: "Le Rooftop",
//         description: "Un bar avec une superbe vue sur la ville.",
//         happyHoure: "19h - 21h",
//         localisationX: 48.8584,
//         localisationY: 2.2945,
//       },
//     ];



const BarListComponent: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  // useEffect(() => {
  //   // Simule un appel API avec les données mockées
  //   setTimeout(() => {
  //     setBars(mockBars);
  //   }, 500); // Simule un léger délai de chargement
  // }, []);

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
