import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext";
import "./EventFormComponent.css";

interface Bar {
  id: string;
  name: string;
}

const EventFormComponent: React.FC = () => {
  const notificationContext = useContext(NotificationContext); 

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateHour, setDateHour] = useState("");
  const [category, setCategory] = useState("");
  const [bars, setBars] = useState<Bar[]>([]);
  const [selectedBarId, setSelectedBarId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      fetchBars(storedUserId);
    } else {
      notificationContext?.setNotification("Utilisateur non authentifié.", "error");
    }
  }, [notificationContext]);

  const fetchBars = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/bar/user/${userId}`);
      if (!response.ok) throw new Error("Erreur lors de la récupération des bars.");

      const data = await response.json();
      setBars(Array.isArray(data) ? data : [data]);

      if (data.length > 0) {
        setSelectedBarId(data[0].id);
      }
    } catch (error) {
      notificationContext?.setNotification("Impossible de récupérer les bars.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dateHour || !category || !selectedBarId) {
      notificationContext?.setNotification("Tous les champs sont obligatoires.", "error");
      return;
    }

    const eventData = {
      title,
      description,
      dateHour: new Date(dateHour).toISOString(),
      category,
      id_Bar: selectedBarId,
    };

    try {
      const response = await fetch("http://localhost:3000/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Erreur lors de la création de l'événement.");

      notificationContext?.setNotification("Événement ajouté avec succès !", "success");

      // Réinitialisation des champs après succès
      setTitle("");
      setDescription("");
      setDateHour("");
      setCategory("");
    } catch (error) {
      notificationContext?.setNotification("Une erreur est survenue lors de la création.", "error");
    }
  };

  return (
    <div className="form-container">
      <p>Vous devez avoir un bar pour publier un événement</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="event-form-title">Titre de l'événement :</label>
        <input
          id="event-form-title"
          data-testid="event-form-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="event-form-description">Description :</label>
        <textarea
          id="event-form-description"
          data-testid="event-form-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="event-form-time">Date et heure :</label>
        <input
          id="event-form-time"
          data-testid="event-form-time"
          type="datetime-local"
          value={dateHour}
          onChange={(e) => setDateHour(e.target.value)}
        />

        <label htmlFor="event-form-category">Catégorie :</label>
        <select
          id="event-form-category"
          data-testid="event-form-category"
          value={category}
          className="form-option"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="Concerts">Concerts</option>
          <option value="Soirées dansantes">Soirées dansantes</option>
          <option value="Quiz / Trivia">Quiz / Trivia</option>
          <option value="Karaoké">Karaoké</option>
          <option value="Happy hours">Happy hours</option>
          <option value="Soirées à thème">Soirées à thème</option>
          <option value="Dégustations">Dégustations</option>
          <option value="Événements sportifs">Événements sportifs</option>
          <option value="Soirées de lancement">Soirées de lancement</option>
          <option value="Stand-up / Comedy nights">Stand-up / Comedy nights</option>
        </select>

        <label htmlFor="event-form-bar">Choisissez un bar :</label>
        <select
          id="event-form-bar"
          data-testid="event-form-bar"
          value={selectedBarId}
          className="form-option"
          onChange={(e) => setSelectedBarId(e.target.value)}
        >
          {bars.length > 0 ? (
            bars.map((bar) => (
              <option key={bar.id} value={bar.id}>
                {bar.name}
              </option>
            ))
          ) : (
            <option value="">Aucun bar trouvé</option>
          )}
        </select>

        <button data-testid="event-form-submit" type="submit">
          Créer l'événement
        </button>
      </form>
    </div>
  );
};

export default EventFormComponent;
