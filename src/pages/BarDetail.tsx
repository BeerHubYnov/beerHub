import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BarDetailComponent from "../components/bar-detail/BarDetailComponent";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

const BarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bar, setBar] = useState<Bar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bar/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data: Bar = await response.json();
        setBar(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBar();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!bar) return <p>Bar non trouvé.</p>;

  return <BarDetailComponent bar={bar} />;
};

export default BarDetail;
