import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext"; 

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
  const [idUser, setIdUser] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const notificationContext = useContext(NotificationContext); 

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
        setIdUser(bar.id_User);
      } catch (error) {
        notificationContext?.setNotification("Impossible de charger les données du bar.", "error"); 
      }
    };

    fetchBar();
  }, [barId, notificationContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !happyHour || !localisationX || !localisationY) {
      notificationContext?.setNotification("Tous les champs sont obligatoires.", "error"); 
      return;
    }

    const userId = idUser ?? ""; 
    if (!userId) {
      notificationContext?.setNotification("Erreur : utilisateur non identifié.", "error"); 
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(barData),
      });

      if (!response.ok) throw new Error("Erreur lors de la modification du bar.");

      notificationContext?.setNotification("Bar modifié avec succès !", "success"); 
      setTimeout(() => navigate(`/bar/${barId}`), 1500);
    } catch (error) {
      notificationContext?.setNotification("Erreur lors de la mise à jour du bar.", "error"); 
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Nom:</label>
        <input id="nom" type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="happyHour">Happy Hour:</label>
        <input id="happyHour" type="text" value={happyHour} onChange={(e) => setHappyHour(e.target.value)} />

        <label htmlFor="localisationX">Localisation X:</label>
        <input id="localisationX" type="number" value={localisationX} onChange={(e) => setLocalisationX(e.target.value)} />

        <label htmlFor="localisationY">Localisation Y:</label>
        <input id="localisationY" type="number" value={localisationY} onChange={(e) => setLocalisationY(e.target.value)} />

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default BarEditComponent;
