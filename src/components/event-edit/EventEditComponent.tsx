import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface EventEditComponentProps {
  eventId: string;
}

const EventEditComponent: React.FC<EventEditComponentProps> = ({ eventId }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateHour, setDateHour] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${eventId}`);
        if (!response.ok)
          throw new Error("Erreur lors du chargement de l'événement.");

        const eventData = await response.json();
        setTitle(eventData.title);
        setDescription(eventData.description);
        setDateHour(eventData.dateHour);
      } catch (error) {
        setErrorMessage("Impossible de charger les données de l'événement.");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title || !description || !dateHour) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    const updatedEvent = {
      title,
      description,
      dateHour,
    };

    try {
      const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok)
        throw new Error("Erreur lors de la modification de l'événement.");

      setSuccessMessage("Événement modifié avec succès !");
      setTimeout(() => navigate(`/events`), 1500);
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour de l'événement.");
    }
  };

  return (
    <div className="form-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="dateHour">Date et heure:</label>
        <input
          id="dateHour"
          type="datetime-local"
          value={dateHour}
          onChange={(e) => setDateHour(e.target.value)}
        />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default EventEditComponent;
