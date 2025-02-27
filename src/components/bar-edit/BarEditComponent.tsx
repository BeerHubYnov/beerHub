import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
  id_User: string;
}

const BarEditComponent: React.FC<{ barId: string }> = ({ barId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [happyHour, setHappyHour] = useState("");
  const [localisationX, setLocalisationX] = useState("");
  const [localisationY, setLocalisationY] = useState("");
  const [idUser, setIdUser] = useState<string | null>(null); // Stockage de l'utilisateur
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bar/${barId}`);
        if (!response.ok) throw new Error("Erreur lors du chargement des données.");
        const bar: Bar = await response.json();
        
        setName(bar.name);
        setDescription(bar.description);
        setHappyHour(bar.happyHoure);
        setLocalisationX(bar.localisationX.toString());
        setLocalisationY(bar.localisationY.toString());
        setIdUser(bar.id_User); // On récupère l'id de l'utilisateur du bar
      } catch (error) {
        setErrorMessage("Impossible de charger les données du bar.");
      }
    };

    fetchBar();
  }, [barId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }

    // Vérification de l'utilisateur
    const userId = idUser ?? "f5bd3efa-093e-4d1f-9f49-caf57998d90d"; // À remplacer avec `user?.id` si l'auth est en place
    if (!userId) {
      setErrorMessage("Erreur : utilisateur non identifié.");
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
      const response = await fetch(`http://localhost:3000/bar/${barId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(barData),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification du bar.");

      setSuccessMessage("Bar modifié avec succès !");
      setTimeout(() => navigate(`/bar/${barId}`), 1500);
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour du bar.");
    }
  };

  return (
    <div className="form-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
  <label htmlFor="nom">Nom:</label>
  <input
    id="nom"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <label htmlFor="description">Description:</label>
  <textarea
    id="description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <label htmlFor="happyHour">Happy Hour:</label>
  <input
    id="happyHour"
    type="text"
    value={happyHour}
    onChange={(e) => setHappyHour(e.target.value)}
  />

  <label htmlFor="localisationX">Localisation X:</label>
  <input
    id="localisationX"
    type="number"
    value={localisationX}
    onChange={(e) => setLocalisationX(e.target.value)}
  />

  <label htmlFor="localisationY">Localisation Y:</label>
  <input
    id="localisationY"
    type="number"
    value={localisationY}
    onChange={(e) => setLocalisationY(e.target.value)}
  />

  <button type="submit">Modifier</button>
</form>

    </div>
  );
};

export default BarEditComponent;
