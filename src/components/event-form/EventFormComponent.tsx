import { useState } from "react";
import './EventFormComponent.css';

const EventFormComponent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateHour, setDateHour] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // ID du bar hardcodé (Grizly Bar)
  const hardcodedBarId = "6b9713ba-02d2-4b49-8925-71ea5565faaf";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Vérifier que tous les champs sont remplis
    if (!title || !description || !dateHour) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    // Format des données pour l'API
    const eventData = {
      title,
      description,
      dateHour: new Date(dateHour).toISOString(), // Convertit la date au format ISO
      id_Bar: hardcodedBarId, // Bar fixe
    };

    console.log("Données de l'événement à envoyer :", eventData);

    try {
      const response = await fetch("http://localhost:3000/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement.");
      }

      setSuccessMessage("Événement ajouté avec succès !");
      setTitle("");
      setDescription("");
      setDateHour("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="form-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>Titre de l'événement :</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description :</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Date et heure :</label>
        <input type="datetime-local" value={dateHour} onChange={(e) => setDateHour(e.target.value)} />

        <button type="submit">Créer l'événement</button>
      </form>
    </div>
  );
};

export default EventFormComponent;
