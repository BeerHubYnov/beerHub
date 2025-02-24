import React from "react";
import { NavLink } from "react-router-dom";
import Favorites from "./../components/user/Favorites";
import UserInfo from "./../components/user/UserInfo"; 
import UserBar from "./../components/user/UserBar"; 
import { useAuth } from "../context/AuthContext";

const Profil: React.FC = () => {
  const { isConnected } = useAuth();

  return (
    <div className="profil">
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page profil !</p>

      {isConnected ? (
        <>
          <UserInfo /> 
          <br></br>
          <Favorites />
          <br></br>
          <UserBar />
        </>
      ) : (
        <NavLink to="/login">Connexion</NavLink>
      )}
    </div>
  );
};

export default Profil;
