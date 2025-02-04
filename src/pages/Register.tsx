import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [idRole, setIdRole] = useState<string>("");
  const navigate = useNavigate();
  

  const fetchRoleId = async () => {
    try {
      // Appel à l'endpoint pour récupérer le rôle "Bar"
      const response = await axios.get("http://localhost:3000/role/name/User");
      // Supposons que la réponse renvoie un objet avec une propriété "id"
      setIdRole(response.data.id);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'id du role", error);
    }
  };

  fetchRoleId();
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      // Votre id_Role reste inchangé
      const id_Role = idRole;

      
      const response = await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        username,
        id_Role,
      });

      console.log("Réponse register :", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="profil">
      <h2>Inscription</h2>
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
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label>Confirmer le mot de passe :</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </div>
  );
};

export default Register;
