import { useState, useEffect } from "react";
import './BarFormComponent.css'

const BarCreationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [happyHour, setHappyHour] = useState("");
  const [localisationX, setLocalisationX] = useState("");
  const [localisationY, setLocalisationY] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // Stockage de l'ID utilisateur

  // Récupérer l'ID utilisateur depuis le localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setErrorMessage("Erreur : utilisateur non authentifié.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    if (!userId) {
      setErrorMessage("Erreur : utilisateur non authentifié.");
      return;
    }

    const barData = {
      name,
      description,
      happyHoure: happyHour,
      localisationX: parseFloat(localisationX),
      localisationY: parseFloat(localisationY),
      id_User: userId,  // Utilisation de l'ID de l'utilisateur récupéré
    };

    console.log("Données du bar à envoyer :", barData);

    try {
      const response = await fetch("http://localhost:3000/bar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(barData),
      });
    
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du bar.");
      }
    
      setSuccessMessage("Bar ajouté avec succès !");
      setName("");
      setDescription("");
      setHappyHour("");
      setLocalisationX("");
      setLocalisationY("");
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
