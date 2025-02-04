import { useEffect, useState } from "react";

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
        const response = await fetch(`http://localhost:3000/favorite/user/${userId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des favoris.");
        }
        
        const data = await response.json();
        console.log("Réponse API favorite :", data); // Ajout du log pour voir la structure de la réponse
    
        if (Array.isArray(data)) {
          setFavorites(data.map((fav: any) => fav.Bar));
        } else {
          console.error("Format de réponse inattendu :", data);
          setError("Format de réponse incorrect.");
        }
      } catch (error) {
        console.error("Erreur :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchFavorites();
  }, [userId]);

  return (
    <div>
      <h2>Mes Bars Favoris</h2>

      {loading ? (
        <p>Chargement des favoris...</p>
      ) : error ? (
        <p style={{ color: "red" }}>❌ {error}</p>
      ) : favorites.length > 0 ? (
        <ul>
          {favorites.map((bar) => (
            <li key={bar.id}>
              <strong>{bar.name}</strong> - {bar.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun favori ajouté.</p>
      )}
    </div>
  );
};

export default Favorites;
