import { useState } from "react";
// import { useAuth } from "../context/AuthContext"; 
import './BarFormComponent.css'
const BarCreationForm: React.FC = () => {
  // const { user } = useAuth(); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [happyHour, setHappyHour] = useState("");
  const [localisationX, setLocalisationX] = useState("");
  const [localisationY, setLocalisationY] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    // if (!user?.id) {
    //   setErrorMessage("Erreur : utilisateur non authentifié.");
    //   return;
    // }

    const barData = {
      name,
      description,
      happyHoure: happyHour,
      localisationX: parseFloat(localisationX),
      localisationY: parseFloat(localisationY),
      // id_User: user.id,
    };

    console.log("Données du bar à envoyer :", barData);

    try {
      const response = await fetch("http://localhost:3000/bars", {
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
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form  onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Happy Hour:
          <input type="text" value={happyHour} onChange={(e) => setHappyHour(e.target.value)} />
        </label>
        <label>
          Localisation X:
          <input type="number" value={localisationX} onChange={(e) => setLocalisationX(e.target.value)} />
        </label>
        <label>
          Localisation Y:
          <input type="number" value={localisationY} onChange={(e) => setLocalisationY(e.target.value)} />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default BarCreationForm;
