import { useState, useContext } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AuthContext } from "./../../context/AuthContext"; // Importer le contexte

const UserInfo: React.FC = () => {
  // Vérification si le contexte est défini
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Déstructuration des valeurs du contexte
  const { userInfos, updateUserInfos } = authContext;
  const [email, setEmail] = useState(userInfos?.email || "");
  const [password, setPassword] = useState(userInfos?.password || "");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setConfirmationMessage("Vous devez être connecté pour modifier vos informations.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        updateUserInfos({ username: userInfos?.username || "", email, password }); // Mettre à jour avec username
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
          <label className="input-label">Email</label>
          <input
            className="input-component"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="input-label">Mot de passe</label>
          <input
            className="input-component"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
