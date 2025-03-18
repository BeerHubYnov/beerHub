import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext"; 

interface EventEditComponentProps {
  eventId: string;
}

const EventEditComponent: React.FC<EventEditComponentProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const notificationContext = useContext(NotificationContext); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateHour, setDateHour] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${eventId}`);
        if (!response.ok) throw new Error("Erreur lors du chargement de l'événement.");

        const eventData = await response.json();
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDateHour(eventData.dateHour);
      } catch (error) {
        notificationContext?.setNotification("Impossible de charger l'événement.", "error");
      }
    };

    fetchEvent();
  }, [eventId, notificationContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dateHour) {
      notificationContext?.setNotification("Tous les champs sont obligatoires.", "error");
      return;
    }

    const updatedEvent = { title, description, dateHour };

    try {
      const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification de l'événement.");

      notificationContext?.setNotification("Événement modifié avec succès !", "success");
      setTimeout(() => navigate(`/events`), 1500);
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de la mise à jour de l'événement.", "error");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre:</label>
        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="dateHour">Date et heure:</label>
        <input id="dateHour" type="datetime-local" value={dateHour} onChange={(e) => setDateHour(e.target.value)} />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EventEditComponent;
