import React from "react";
import { NavLink } from "react-router-dom";
import Favorites from "./../components/user/Favorites";
// import UserInfo from "./../components/user/UserInfo";
import { useAuth } from "../context/AuthContext";

const Profil: React.FC = () => {
  const { isConnected } = useAuth();

  return (
    <div className="profil">
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page profil !</p>

      {isConnected ? <Favorites /> : <NavLink to={`/login`}>Connexion</NavLink>}
      {/* {isConnected ? <UserInfo /> : <NavLink to={`/login`}>Connexion</NavLink>} */}
    </div>
  );
};

export default Profil;
