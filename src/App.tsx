import React, { useEffect, useState } from "react";
import axiosInstance from "./axios/axiosInstance";

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour récupérer le message depuis l'API
    const fetchMessage = async () => {
      try {
        const response = await axiosInstance.get("/"); // Endpoint racine
        setMessage(response.data); // Stocker la réponse
      } catch (err: any) {
        setError(err.message); // En cas d'erreur, stocker le message
      }
    };

    fetchMessage();
  }, []); // Exécuter une fois au montage du composant

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Message from Backend</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default App;
