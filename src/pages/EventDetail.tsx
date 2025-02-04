import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventDetailComponent from "../components/event-detail/EventDetailComponent";

interface Event {
  id: string;
  title: string;
  description: string;
  dateHour: string;

}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${id}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const data: Event = await response.json();
        setEvent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!event) return <p>Event non trouvé.</p>;

  return <EventDetailComponent event={event} />;
};

export default EventDetail;
