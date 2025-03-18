import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";  
import { NotificationContext } from "../../context/NotificationContext"; 

interface Event {
  id: string;
  title: string;
  id_User: string; 
}

const EventDeleteComponent: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();
  const { userId } = useAuth(); 
  const notificationContext = useContext(NotificationContext);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${eventId}`);
        if (!response.ok) throw new Error("Impossible de récupérer l'événement.");

        const data: Event = await response.json();
        setEvent(data);

        // Vérification du propriétaire de l'événement
        if (data.id_User === userId) {
          setIsOwner(true);
        }
      } catch (error) {
        notificationContext?.setNotification("Erreur lors de la récupération des données.", "error");
      }
    };

    fetchEvent();
  }, [eventId, userId, notificationContext]);

  const handleDelete = async () => {
    if (!event) {
      notificationContext?.setNotification("Les données de l'événement ne sont pas disponibles.", "error");
      return;
    }

    if (!isOwner) {
      notificationContext?.setNotification("Vous n'êtes pas autorisé à supprimer cet événement.", "error");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/event/${eventId}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Erreur lors de la suppression de l'événement.");

      notificationContext?.setNotification("Événement supprimé avec succès !", "success");
      navigate("/events"); 
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de la suppression de l'événement.", "error");
    }
  };

  return (
    <div className="delete-container">
      {event && (
        <>
          <h2>Supprimer l'événement : {event.title}</h2>
          <p>Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.</p>
          <button onClick={handleDelete} className="delete-button" disabled={!isOwner}>
            Supprimer
          </button>
          <button onClick={() => navigate(-1)} className="cancel-button">Annuler</button>
        </>
      )}
    </div>
  );
};

export default EventDeleteComponent;
