import React, { useState, useEffect } from "react";
import MapComponent from "../Map/MapComponent";
import { useAuth } from "./../../context/AuthContext";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./BarDetailComponent.css";

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
  const { isConnected } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const userId = localStorage.getItem("userId");
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const checkIfFavorite = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/favorite/user/${userId}`
        );
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des favoris.");

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

  const showTemporaryMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const addToFavorites = async () => {
    if (!isConnected) {
      showTemporaryMessage("Vous devez être connecté pour ajouter un favori !");
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
        showTemporaryMessage("Bar ajouté aux favoris !");
      } else {
        showTemporaryMessage("Erreur lors de l'ajout du favori.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  const removeFromFavorites = async () => {
    if (!favoriteId)
      return showTemporaryMessage("Ce bar n'est pas dans vos favoris.");

    try {
      const response = await fetch(
        `http://localhost:3000/favorite/${favoriteId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setIsFavorite(false);
        setFavoriteId(null);
        showTemporaryMessage("Bar retiré des favoris !");
      } else {
        showTemporaryMessage("Erreur lors de la suppression du favori.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  /** Fonction qui extrait l'affichage du bouton favori */
  const renderFavoriteButton = () => {
    if (!isConnected) {
      return <p>Connectez-vous pour ajouter ce bar en favori.</p>;
    }

    return isFavorite ? (
      <button onClick={removeFromFavorites} className="btnLink">
        Retirer des favoris <FavoriteIcon style={{ fill: "red" }} />
      </button>
    ) : (
      <button onClick={addToFavorites} className="btnLink">
        Ajouter aux favoris <FavoriteBorderIcon style={{ fill: "red" }} />
      </button>
    );
  };

  return (
    <div>
      <h2>{bar.name}</h2>
      <p>{bar.description}</p>
      <p>Happy Hour : {bar.happyHoure}</p>
      <br />
      <div className="BtnList">
        <NavLink to={`/bar-edit/${bar.id}`} className="BarBtn">
          <EditIcon /> Modifier
        </NavLink>
        <br />
        <NavLink to={`/bar-delete/${bar.id}`} className="BarBtn">
          <DeleteForeverIcon /> Supprimer
        </NavLink>
      </div>

      {/* ✅ Affichage du message temporaire */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* ✅ Appel de la fonction indépendante pour le bouton favori */}
      {renderFavoriteButton()}

      <h3>Localisation</h3>
      <div style={{ height: "400px", width: "100%" }}>
        <MapComponent lat={bar.localisationX} lng={bar.localisationY} markers={[bar]} />
      </div>
    </div>
  );
};

export default BarDetailComponent;
