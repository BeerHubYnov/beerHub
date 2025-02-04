import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./BarCard.css";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

const BarCard: React.FC<{ bar: Bar }> = ({ bar }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isConnected, setIsConnected] = useState(!!localStorage.getItem("token"));

  // Vérifie si l'utilisateur est connecté (simulation via localStorage)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsConnected(!!localStorage.getItem("token"));
    };
 
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fonction pour ajouter un bar aux favoris
  const addToFavorites = async () => {
    if (!isConnected) {
      alert("Vous devez être connecté pour ajouter un favori !");
      return;
    }

    try {
      const storedUser = localStorage.getItem("userId");
      const response = await fetch("http://localhost:3000/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_User: storedUser,
          id_Bar: bar.id,
        }),
      });

      if (response.ok) {
        setIsFavorite(true);
        alert("Bar ajouté aux favoris !");
      } else {
        alert("Erreur lors de l'ajout du favori.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="bar-card">
      <h3>{bar.name}</h3>
      <p>
        <strong>Description :</strong> {bar.description}
      </p>
      <p>
        <strong>Happy Hour :</strong> {bar.happyHoure}
      </p>
      <p>
        <strong>Localisation :</strong> {bar.localisationX}, {bar.localisationY}
      </p>
      <NavLink to={`/bar/${bar.id}`}>Voir les détails</NavLink>
      <br />
      <NavLink to={`/bar-edit/${bar.id}`}>Modifier</NavLink>
      <br />
      <NavLink to={`/bar-delete/${bar.id}`}>Supprimer</NavLink>
      <br />

      {/* Bouton Favori */}
      {isConnected ? (
        <button onClick={addToFavorites} disabled={isFavorite}>
          {isFavorite ? "Ajouté aux favoris" : "Ajouter aux favoris"}
        </button>
      ) : (
        <p>Connectez-vous pour ajouter ce bar en favori.</p>
      )}
    </div>
  );
};

export default BarCard;
