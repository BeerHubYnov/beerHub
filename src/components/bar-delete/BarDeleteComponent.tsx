import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext"; 

interface Bar {
  id: string;
  name: string;
  id_User: string;
}

const BarDeleteComponent: React.FC<{ barId: string }> = ({ barId }) => {
  const [bar, setBar] = useState<Bar | null>(null);
  const navigate = useNavigate();
  const notificationContext = useContext(NotificationContext); 

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bar/${barId}`);
        if (!response.ok) throw new Error("Impossible de récupérer le bar.");

        const data: Bar = await response.json();
        setBar(data);
      } catch (error) {
        notificationContext?.setNotification("Erreur lors de la récupération des données.", "error");
      }
    };

    fetchBar();
  }, [barId, notificationContext]);

  const handleDelete = async () => {
    if (!bar) {
      notificationContext?.setNotification("Les données du bar ne sont pas disponibles.", "error");
      return;
    }

    if (bar.id_User !== currentUserId) {
      notificationContext?.setNotification("Vous n'êtes pas autorisé à supprimer ce bar.", "error");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/bar/${barId}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Erreur lors de la suppression du bar.");

      notificationContext?.setNotification("Bar supprimé avec succès !", "success");
      navigate("/bars"); // Redirection après succès
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de la suppression du bar.", "error");
    }
  };

  return (
    <div className="delete-container">
  {bar && (
        <>
          <h2>Supprimer le bar : {bar.name}</h2>
          <p>Êtes-vous sûr de vouloir supprimer ce bar ? Cette action est irréversible.</p>
          <button onClick={handleDelete} className="delete-button">
            Supprimer
          </button>
          <button onClick={() => navigate(-1)} className="cancel-button">
            Annuler
          </button>
        </>
      )}
    </div>
  );
};

export default BarDeleteComponent;
