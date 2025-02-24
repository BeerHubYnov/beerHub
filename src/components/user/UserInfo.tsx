import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AuthContext } from "./../../context/AuthContext"; // Importer le contexte

const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { userInfos, updateUserInfos } = authContext;
  const [username, setUsername] = useState(userInfos?.username || "");
  const [email, setEmail] = useState(userInfos?.email || "");
  const [password, setPassword] = useState(userInfos?.password || "");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateUserInfo = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setConfirmationMessage("Vous devez être connecté pour modifier vos informations.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH", // Utiliser la méthode PATCH pour la mise à jour partielle
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Passer le token dans les headers
        },
        body: JSON.stringify({ username, email, password }), // Utilise les valeurs mises à jour
      });

      if (response.ok) {
        // Si la mise à jour est réussie
        updateUserInfos({ username, email, password }); // Utilise les nouvelles valeurs
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
        <div>
          <label className="input-label">Nom d'utilisateur</label>
          <input
            className="input-component"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Mettre à jour l'username
          />
        </div>
        <div>
          <label className="input-label">Email</label>
          <input
            className="input-component"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'email
          />
        </div>
        <div>
          <label className="input-label">Mot de passe</label>
          <input
            className="input-component"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Mettre à jour le mot de passe
          />
        </div>
        <div>
          <button
            className="button-component"
            onClick={updateUserInfo}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Modifier"}
          </button>
        </div>
        {confirmationMessage && (
          <p className="confirmation-message">{confirmationMessage}</p>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default UserInfo;
