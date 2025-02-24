import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Bar {
  id: string;
  name: string;
  id_User: string; // ID du propriétaire
}

const BarDeleteComponent: React.FC<{ barId: string }> = ({ barId }) => {
  const [bar, setBar] = useState<Bar | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Récupérer l'ID de l'utilisateur connecté depuis le localStorage
  const currentUserId = localStorage.getItem("userId"); // On récupère l'ID depuis le localStorage

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bar/${barId}`);
        if (!response.ok) throw new Error("Impossible de récupérer les données du bar.");
        const data: Bar = await response.json();
        setBar(data);
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des données.");
      }
    };

    fetchBar();
  }, [barId]);

  const handleDelete = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!bar) {
      setErrorMessage("Les données du bar ne sont pas disponibles.");
      return;
    }

    // Vérification que l'utilisateur connecté est bien le propriétaire du bar
    if (bar.id_User !== currentUserId) {
      setErrorMessage("Vous n'êtes pas autorisé à supprimer ce bar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/bar/${barId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression du bar.");

      setSuccessMessage("Bar supprimé avec succès !");
      setTimeout(() => navigate("/bars"), 1500); // Redirection vers l'accueil après suppression
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression du bar.");
    }
  };

  return (
    <div className="delete-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {bar && (
        <>
          <h2>Supprimer le bar : {bar.name}</h2>
          <p>Êtes-vous sûr de vouloir supprimer ce bar ? Cette action est irréversible.</p>
          <button onClick={handleDelete} className="delete-button">Supprimer</button>
          <button onClick={() => navigate(-1)} className="cancel-button">Annuler</button>
        </>
      )}
    </div>
  );
};

export default BarDeleteComponent;
