import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [idRole, setIdRole] = useState<string>("");
  
  // États pour stocker les erreurs spécifiques
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoleId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/role/name/User");
        setIdRole(response.data.id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'id du rôle", error);
        setServerError("Impossible de récupérer le rôle utilisateur.");
      }
    };

    fetchRoleId();
  }, []);

  // Vérifie si l'email est valide
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Réinitialisation des erreurs
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setServerError(null);

    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError("Email invalide !");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères !");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas !");
      hasError = true;
    }

    if (hasError) return; // Stoppe l'envoi du formulaire s'il y a une erreur

    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        username,
        id_Role: idRole,
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Erreur lors de l'inscription", error);
      
      // Vérifie si le backend retourne une erreur spécifique (ex: email déjà utilisé)
      if (error.response?.data?.message === "Cet email est déjà utilisé") {
        setEmailError("Cet email est déjà utilisé !");
      } else {
        setServerError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="profil">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            data-testid="register-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email :</label>
          <input
            data-testid="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            data-testid="register-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div>
          <label htmlFor="password-confirm">Confirmer le mot de passe :</label>
          <input
            data-testid="register-password-confirm"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        </div>

        {serverError && <p className="error-message">{serverError}</p>}

        <button data-testid="register-submit" type="submit">S'inscrire</button>
      </form>
      <p>
        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
      </p>
    </div>
  );
};

export default Register;
