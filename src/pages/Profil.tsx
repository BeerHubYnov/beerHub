import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profil: React.FC = () => {
  const navigate = useNavigate();
  // On considère l'utilisateur connecté s'il existe un token dans le localStorage
  const isConnected = !!localStorage.getItem("token");

  const handleLogout = () => {
    // Vide tout le local storage (ou utilisez localStorage.removeItem("token") pour supprimer uniquement le token)
    localStorage.clear();
    // Redirige vers la page de connexion
    navigate("/login");
  };

  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page profil !</p>
      {isConnected ? (
        <button onClick={handleLogout}>Déconnexion</button>
      ) : (
   
        <NavLink to={`/login`}>Connexion</NavLink> 

      )}
    </div>
  );
};

export default Profil;
