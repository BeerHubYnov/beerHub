import { useState } from "react";
import './BarFormComponent.css';

const BarFormComponent: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [happyHour, setHappyHour] = useState("");
  const [localisationX, setLocalisationX] = useState("");
  const [localisationY, setLocalisationY] = useState("");
  const [userId, setUserId] = useState(""); // À récupérer dynamiquement
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/bars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          happyHoure: happyHour,
          localisationX: parseFloat(localisationX),
          localisationY: parseFloat(localisationY),
          id_User: userId, // À récupérer dynamiquement (ex: depuis l'authentification)
        }),
      });
      console.log(response);

      if (!response.ok) throw new Error("Erreur lors de l'ajout du bar");

      setSuccessMessage("Bar ajouté avec succès !");
      setErrorMessage(null);

      // Réinitialisation des champs
      setName("");
      setDescription("");
      setHappyHour("");
      setLocalisationX("");
      setLocalisationY("");
      setUserId("");
    } catch (error) {
      setErrorMessage("Une erreur est survenue.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="form-container">
    
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nom du Bar :</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Description :</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Happy Hour :</label>
        <input type="text" value={happyHour} onChange={(e) => setHappyHour(e.target.value)} />

        <label>Localisation X :</label>
        <input type="number" value={localisationX} onChange={(e) => setLocalisationX(e.target.value)} />

        <label>Localisation Y :</label>
        <input type="number" value={localisationY} onChange={(e) => setLocalisationY(e.target.value)} />

        <label>ID Utilisateur :</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default BarFormComponent;
