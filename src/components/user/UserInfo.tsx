import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AuthContext } from "./../../context/AuthContext"; // Importer le contexte


const UserInfo: React.FC = () => {
  // Vérification si le contexte est défini
  const authContext = useContext(AuthContext);

  // Si le contexte est indéfini, on lance une erreur
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Déstructuration des valeurs du contexte
  const { userInfos, updateUserInfos } = authContext; // Accéder aux infos utilisateur et à la méthode pour les mettre à jour
  const [email, setEmail] = useState(userInfos?.email || ""); // Initialiser avec l'email de l'utilisateur
  const [password, setPassword] = useState(userInfos?.password || ""); // Initialiser avec le mot de passe de l'utilisateur
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateUserInfo = async () => {
    const token = localStorage.getItem("token"); // Obtenir le token depuis localStorage
    if (!token) {
      setConfirmationMessage("Vous devez être connecté pour modifier vos informations.");
      return;
    }

    setLoading(true);
    try {
      // Simuler un appel à une API pour mettre à jour les infos
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Ajouter le token dans les en-têtes pour l'authentification
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Si la mise à jour est réussie
        updateUserInfos({ email, password }); // Mettre à jour les infos dans le contexte
        setConfirmationMessage("Les informations ont été mises à jour avec succès !");
      } else {
        throw new Error("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setConfirmationMessage("Une erreur est survenue lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion className="user-profile-accordion">
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <h2>Modifier mes infos</h2>
      </AccordionSummary>
      <AccordionDetails>
        {/* Champ pour l'email */}
        <div>
          <label className="input-label">Email</label>
          <input
            className="input-component"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'email
          />
        </div>

        {/* Champ pour le mot de passe */}
        <div>
          <label className="input-label">Mot de passe</label>
          <input
            className="input-component"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mise à jour du mot de passe
          />
        </div>

        {/* Bouton pour soumettre la modification */}
        <div>
          <button
            className="button-component"
            onClick={updateUserInfo}
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? "Chargement..." : "Modifier"}
          </button>
        </div>

        {/* Affichage du message de confirmation */}
        {confirmationMessage && (
          <p className="confirmation-message">{confirmationMessage}</p>
        )}
      </AccordionDetails>
    </Accordion>
  
  );
};

export default UserInfo;
