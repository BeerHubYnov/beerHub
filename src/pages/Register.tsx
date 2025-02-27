import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [idRole, setIdRole] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // ✅ État pour stocker le message d'erreur
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoleId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/role/name/User");
        setIdRole(response.data.id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'id du rôle", error);
        setError("Impossible de récupérer le rôle utilisateur.");
      }
    };

    fetchRoleId();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // ✅ Réinitialisation de l'erreur avant chaque soumission

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const id_Role = idRole;
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        username,
        id_Role,
      });

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      setError("Erreur lors de l'inscription. Veuillez réessayer."); // ✅ Gestion de l'erreur
    }
  };

  return (
    <div className="profil">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            data-testid="register-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            data-testid="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            data-testid="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmer le mot de passe :</label>
          <input
            data-testid="register-password-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* ✅ Affichage du message d'erreur si présent */}
        {error && <p className="error-message">{error}</p>}


        <button type="submit">S'inscrire</button>
      </form>
      <p>
        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </div>
  );
};

export default Register;
