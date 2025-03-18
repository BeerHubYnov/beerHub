import React, { useState, useEffect, useContext } from "react";
import MapComponent from "../Map/MapComponent";
import { useAuth } from "../../context/AuthContext";
import { NotificationContext } from "../../context/NotificationContext";
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
  id_User: string;
}

interface BarDetailComponentProps {
  bar: Bar;
}

const BarDetailComponent: React.FC<BarDetailComponentProps> = ({ bar }) => {
  const { isConnected } = useAuth();
  const notificationContext = useContext(NotificationContext); 
  const userId = localStorage.getItem("userId");
  const [isOwner, setIsOwner] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  useEffect(() => {
    if (userId && bar.id_User === userId) {
      setIsOwner(true);
    }
  }, [userId, bar.id_User]);

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
        notificationContext?.setNotification("Erreur lors de la récupération des favoris.", "error"); 
      }
    };

    checkIfFavorite();
  }, [userId, bar.id, notificationContext]);

  const addToFavorites = async () => {
    if (!isConnected) {
      notificationContext?.setNotification("Vous devez être connecté pour ajouter un favori !", "error"); 
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
        notificationContext?.setNotification("Bar ajouté aux favoris !", "success"); 
      } else {
        notificationContext?.setNotification("Erreur lors de l'ajout du favori.", "error"); 
      }
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de l'ajout du favori.", "error"); 
    }
  };

  const removeFromFavorites = async () => {
    if (!favoriteId) {
      notificationContext?.setNotification("Ce bar n'est pas dans vos favoris.", "info"); 
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/favorite/${favoriteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsFavorite(false);
        setFavoriteId(null);
        notificationContext?.setNotification("Bar retiré des favoris !", "success"); 
      } else {
        notificationContext?.setNotification("Erreur lors de la suppression du favori.", "error"); 
      }
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de la suppression du favori.", "error"); 
    }
  };

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
    <div className="profil">
      <h2>{bar.name}</h2>
      <p>{bar.description}</p>
      <p>Happy Hour : {bar.happyHoure}</p>

      {/* Afficher les boutons Modifier/Supprimer seulement si l'utilisateur est propriétaire */}
      {isOwner && (
        <div className="BtnList">
          <NavLink to={`/bar-edit/${bar.id}`} className="BarBtn">
            <EditIcon /> Modifier
          </NavLink>
          <br />
          <NavLink to={`/bar-delete/${bar.id}`} className="BarBtn">
            <DeleteForeverIcon /> Supprimer
          </NavLink>
        </div>
      )}

      {renderFavoriteButton()}

      <h3>Localisation</h3>
      <div style={{ height: "400px", width: "100%" }}>
        <MapComponent lat={bar.localisationX} lng={bar.localisationY} markers={[bar]} />
      </div>
    </div>
  );
};

export default BarDetailComponent;
