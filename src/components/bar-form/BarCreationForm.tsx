import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext"; 
import "./BarFormComponent.css";

const BarCreationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [happyHour, setHappyHour] = useState("");
  const [localisationX, setLocalisationX] = useState("");
  const [localisationY, setLocalisationY] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const notificationContext = useContext(NotificationContext); 

  // Récupérer l'ID utilisateur depuis le localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      notificationContext?.setNotification("Erreur : utilisateur non authentifié.", "error");
    }
  }, [notificationContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      notificationContext?.setNotification("Tous les champs sont obligatoires.", "error"); 
      return;
    }

    if (!userId) {
      notificationContext?.setNotification("Erreur : utilisateur non authentifié.", "error"); 
      return;
    }

    const barData = {
      name,
      description,
      happyHoure: happyHour,
      localisationX: parseFloat(localisationX),
      localisationY: parseFloat(localisationY),
      id_User: userId,
    };

    try {
      const response = await fetch("http://localhost:3000/bar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(barData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du bar.");
      }

      notificationContext?.setNotification("Bar ajouté avec succès !", "success"); 

      // Réinitialisation du formulaire
      setName("");
      setDescription("");
      setHappyHour("");
      setLocalisationX("");
      setLocalisationY("");

    } catch (error) {
      if (error instanceof Error) {
        notificationContext?.setNotification(error.message, "error"); 
      } else {
        notificationContext?.setNotification("Une erreur inconnue est survenue.", "error"); 
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom:</label>
        <input
          data-testid="bar-form-name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          data-testid="bar-form-description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="happyHour">Happy Hour:</label>
        <input
          data-testid="bar-form-happy-hour"
          id="happyHour"
          type="text"
          value={happyHour}
          onChange={(e) => setHappyHour(e.target.value)}
        />

        <label htmlFor="localisationX">Localisation X:</label>
        <input
          data-testid="bar-form-latitude"
          id="localisationX"
          type="number"
          value={localisationX}
          onChange={(e) => setLocalisationX(e.target.value)}
        />

        <label htmlFor="localisationY">Localisation Y:</label>
        <input
          data-testid="bar-form-longitude"
          id="localisationY"
          type="number"
          value={localisationY}
          onChange={(e) => setLocalisationY(e.target.value)}
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default BarCreationForm;
