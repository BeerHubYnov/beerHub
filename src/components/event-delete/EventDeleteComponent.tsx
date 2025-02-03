import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  id_User: string; // ID du propriétaire
}

const EventDeleteComponent: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const currentUserId = "71172e03-b001-4b8f-ba9c-9a40d170a1f9"; // Simule un utilisateur connecté

  // Charger les données de l'événement
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${eventId}`);
        if (!response.ok) throw new Error("Impossible de récupérer les données de l'événement.");
        const data: Event = await response.json();
        setEvent(data);
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des données.");
      }
    };

    fetchEvent();
  }, [eventId]);

  // Fonction de suppression
  const handleDelete = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!event) {
      setErrorMessage("Les données de l'événement ne sont pas disponibles.");
      return;
    }

    // Vérification du propriétaire de l'événement
    if (event.id_User !== currentUserId) {
      setErrorMessage("Vous n'êtes pas autorisé à supprimer cet événement.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression de l'événement.");

      setSuccessMessage("Événement supprimé avec succès !");
      setTimeout(() => navigate("/events"), 1500); // Redirection vers la liste des événements
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'événement.");
    }
  };

  return (
    <div className="delete-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      {event && (
        <>
          <h2>Supprimer l'événement : {event.title}</h2>
          <p>Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.</p>
          <button onClick={handleDelete} className="delete-button">Supprimer</button>
          <button onClick={() => navigate(-1)} className="cancel-button">Annuler</button>
        </>
      )}
    </div>
  );
};

export default EventDeleteComponent;
