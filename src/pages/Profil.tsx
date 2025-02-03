import React from "react";
import { NavLink } from "react-router-dom";

const Profil: React.FC = () => {
  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page profil !</p>
      <NavLink to={`/login`}>Se connecter</NavLink>
    </div>
  );
};

export default Profil;
