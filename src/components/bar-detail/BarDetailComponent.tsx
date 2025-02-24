import React from "react";
import MapComponent from "../Map/MapComponent";
import { useAuth } from "./../../context/AuthContext"; 
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

interface BarDetailComponentProps {
  bar: Bar;
}

const BarDetailComponent: React.FC<BarDetailComponentProps> = ({ bar }) => {
  const { isConnected } = useAuth(); // ✅ Utilisation du contexte
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = localStorage.getItem("userId"); 
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

    // Vérifier si le bar est déjà favori
    useEffect(() => {
      if (!userId) return;
  
      const checkIfFavorite = async () => {
        try {
          const response = await fetch(`http://localhost:3000/favorite/user/${userId}`);
          if (!response.ok) throw new Error("Erreur lors de la récupération des favoris.");
  
          const data = await response.json();
          const favorite = data.find((fav: any) => fav.id_Bar === bar.id);
  
          if (favorite) {
            setIsFavorite(true);
            setFavoriteId(favorite.id);
          }
        } catch (error) {
          console.error("Erreur :", error);
        }
      };
  
      checkIfFavorite();
    }, [userId, bar.id]);
  
    const addToFavorites = async () => {
      if (!isConnected) {
        alert("Vous devez être connecté pour ajouter un favori !");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_User: userId, id_Bar: bar.id }),
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
  
    const removeFromFavorites = async () => {
      if (!favoriteId) return alert("Ce bar n'est pas dans vos favoris.");
  
      try {
        const response = await fetch(`http://localhost:3000/favorite/${favoriteId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          setIsFavorite(false);
          setFavoriteId(null);
          alert("Bar retiré des favoris !");
        } else {
          alert("Erreur lors de la suppression du favori.");
        }
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

  return (
    <div>
      <h2>{bar.name}</h2>
      <p>{bar.description}</p>
      <p>Happy Hour : {bar.happyHoure}</p>
      <br />
      <NavLink to={`/bar-edit/${bar.id}`}>Modifier</NavLink>
      <br />
      <NavLink to={`/bar-delete/${bar.id}`}>Supprimer</NavLink>
      <br />

      {/* Bouton Favori */}
      {isConnected ? (
        isFavorite ? (
          <button onClick={removeFromFavorites} style={{ background: "red", color: "white" }}>
            Retirer des favoris
          </button>
        ) : (
          <button onClick={addToFavorites}>Ajouter aux favoris</button>
        )
      ) : (
        <p>Connectez-vous pour ajouter ce bar en favori.</p>
      )}
      <h3>Localisation</h3>
      <MapComponent lat={bar.localisationX} lng={bar.localisationY} markers={[bar]} />
    </div>
  );
};

export default BarDetailComponent;