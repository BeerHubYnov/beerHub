import React from "react";
import { useContext } from "react";
// import { NavLink } from "react-router-dom";
import { AuthContext } from "./../providers/AuthProvider";
// import { useNavigate } from "react-router-dom";


const Profil: React.FC = () => {
  // const navigate = useNavigate();
  // On considère l'utilisateur connecté s'il existe un token dans le localStorage
  // const isConnected = !!localStorage.getItem("token");
  const { state } = useContext(AuthContext);
  // const handleLogout = () => {
  //   localStorage.clear();
  //   navigate("/login");
  // };
  if (!state.isLogged) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div>
    <h1>Bienvenue, {state.userInfos.username}</h1>
    {/* Affiche les autres informations utilisateur ici */}
  </div>
    // <div>
    //   <h2>Mon Profil</h2>
    //   <p>Bienvenue sur votre page profil !</p>

    //   <NavLink to={`/login`}>Se connecter</NavLink>

    //   {isConnected ? (
    //     <button onClick={handleLogout}>Déconnexion</button>
    //     <h1>Bienvenue, {state.userInfos.username}</h1>
    //   ) : (
   
    //     <NavLink to={`/login`}>Connexion</NavLink> 

    //   )}

    // </div>
  );
};

export default Profil;
