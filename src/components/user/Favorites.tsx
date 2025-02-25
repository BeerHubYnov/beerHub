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
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Bar[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer userId depuis localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Récupérer les favoris de l'utilisateur
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/favorite/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des favoris.");
        }

        const data = await response.json();
        console.log("Réponse API favorite :", data); // Vérification du format

        if (Array.isArray(data)) {
          setFavorites(data.map((fav: any) => fav.Bar));
        } else {
          console.error("Format de réponse inattendu :", data);
          setError("Format de réponse incorrect.");
        }
      } catch (error) {
        // Vérifie si l'erreur est une instance d'Error
        if (error instanceof Error) {
          setError(error.message); // Accède à message si c'est une instance d'Error
        } else {
          setError("Une erreur inconnue est survenue.");
        }
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <Accordion className="user-profile-accordion">
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          
        >
          <h2>Mes Bars Favoris</h2>
        </AccordionSummary>
        <AccordionDetails>
          {loading ? (
            <p>Chargement des favoris...</p>
          ) : error ? (
            <p style={{ color: "red" }}>❌ {error}</p>
          ) : favorites.length > 0 ? (
            <div className="bar-list">
              {favorites.map((bar) => (
                <BarCard key={bar.id} bar={bar} />
              ))}
            </div>
          ) : (
            <p>Aucun favori ajouté.</p>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Favorites;
