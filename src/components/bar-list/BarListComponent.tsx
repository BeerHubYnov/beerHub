import { useEffect, useState, useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
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
  const notificationContext = useContext(NotificationContext);

  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch("http://localhost:3000/bar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des bars.");
        }
        const data = await response.json();
        setBars(data);
        notificationContext?.setNotification("Bars chargés avec succès !", "success"); 
      } catch (error) {
        notificationContext?.setNotification("Impossible de charger les bars.", "error"); 
      }
    };

    fetchBars();
  }, [notificationContext]);

  return (
    <div className="bar-list-container">
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
