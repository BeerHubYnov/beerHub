import { useState } from "react";
// import { useAuth } from "../context/AuthContext"; 
import './BarEditComponent.css'
const BarEditComponent: React.FC = () => {
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
      id_User: "4f79202c-1efb-4716-910e-3eb2b2a065a6",
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
      <label>Nom:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
  
      <label>Happy Hour:</label>
      <input type="text" value={happyHour} onChange={(e) => setHappyHour(e.target.value)} />
  
      <label>Localisation X:</label>
      <input type="number" value={localisationX} onChange={(e) => setLocalisationX(e.target.value)} />
  
      <label>Localisation Y:</label>
      <input type="number" value={localisationY} onChange={(e) => setLocalisationY(e.target.value)} />
  
      <button type="submit">Ajouter</button>
    </form>
  </div>
  
  );
};

export default BarEditComponent;
