import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // ✅ Import du contexte Auth

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth();  // ✅ Récupère la fonction login() du contexte

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // ✅ Envoi des identifiants au backend
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      console.log("Réponse login :", response.data);

      // ✅ Stockage du token et de l'ID utilisateur
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);

      // ✅ Appel de login() pour mettre à jour le contexte d'authentification
      login(response.data.access_token);

      // ✅ Redirection après connexion
      navigate("/profil");
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      alert("Erreur de connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className="profil">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
          data-testid="login-name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
             data-testid="login-pwd"
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
