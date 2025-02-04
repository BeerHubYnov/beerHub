import React from "react";
import { NavLink } from "react-router-dom";

import Favorites from './../components/user/Favorites'

// import { useNavigate } from "react-router-dom";


const Profil: React.FC = () => {
  // const navigate = useNavigate();
  // On considère l'utilisateur connecté s'il existe un token dans le localStorage
  const isConnected = !!localStorage.getItem("token");

  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };

  return (
    <div className="profil">
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page profil !</p>

  

      {isConnected ? (
        <Favorites />
      ) : (
   
        <NavLink to={`/login`}>Connexion</NavLink> 

      )}

    </div>
  );
};

export default Profil;
