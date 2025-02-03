import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../providers/AuthProvider"; // Assurez-vous de bien importer le contexte

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // Récupérer le contexte d'authentification
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Remplacez l'URL par votre route de connexion
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      console.log("Réponse login :", response.data);

      // Sauvegarder le token et l'utilisateur dans le localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("@user", JSON.stringify(response.data.user)); // Sauvegarder les infos utilisateur

      // Mettre à jour l'état global de l'utilisateur dans le contexte via dispatch
      dispatch({ type: "LOGIN", payload: response.data.user });

      // Rediriger vers la page de profil
      navigate("/profil");
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p>
        Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous</a>
      </p>
    </div>
  );
};

export default Login;
