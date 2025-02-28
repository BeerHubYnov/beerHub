import { useEffect, useState } from "react";
import BarCard from "./../bar-list/BarCard";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
  id_User: string;
  User: {
    id: string;
    username: string;
    email: string;
  };
}

const UserBar: React.FC = () => {
  const [proprio, setProprio] = useState<Bar[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer userId depuis localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Récupération du userId depuis localStorage:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("Aucun userId trouvé dans localStorage.");
    }
  }, []);

  // Récupérer les bars de l'utilisateur
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      console.log("userId est vide, arrêt du chargement.");
      return;
    }

    const fetchProprio = async () => {
      console.log(
        "Début de la récupération des bars pour l'utilisateur:",
        userId
      );
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/bar/user/${userId}`
        );
        console.log("Réponse du serveur reçue, statut:", response.status);

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des bars dont vous êtes proprio."
          );
        }

        const data = await response.json();
        console.log("Réponse API bars :", data); // Vérification du format

        // Si l'API renvoie un seul bar, on transforme en tableau
        if (data) {
          // Si la réponse est un objet, on le met dans un tableau
          const bars = Array.isArray(data) ? data : [data];
          console.log("Nombre de bars récupérés :", bars.length);
          setProprio(bars); // Met à jour l'état avec le tableau de bars
        } else {
          console.error("Aucune donnée retournée par l'API.");
          setError("Aucun bar trouvé.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message); // Accède à message si c'est une instance d'Error
        } else {
          setError("Une erreur inconnue est survenue.");
        }
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
        console.log("Chargement terminé.");
      }
    };

    fetchProprio();
  }, [userId]);

  return (
    <div>
      <Accordion className="user-profile-accordion">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h2>Mes Bars</h2>
        </AccordionSummary>
        <AccordionDetails>
          {loading && <p>Chargement de mes bars...</p>}

          {!loading && error && <p style={{ color: "red" }}>❌ {error}</p>}

          {!loading && !error && proprio.length > 0 && (
            <div className="bar-list">
              {proprio.map((bar) => (
                <BarCard key={bar.id} bar={bar} />
              ))}
            </div>
          )}

          {!loading && !error && proprio.length === 0 && (
            <p>Aucun bar ajouté.</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default UserBar;
