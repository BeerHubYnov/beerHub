import React, { useEffect, useState } from "react";
import EventMapCard from "../components/Map/EventMapCard";

interface Event {
  id: string;
  dateHour: string;
  title: string;
  description: string;
  id_Bar: string;
  category: string;
  id_User: string; // Ajout de l'ID du propriétaire
  Bar: {
    id: string;
    id_User: string;
    name: string;
    description: string;
    happyHoure: string;
    localisationX: number;
    localisationY: number;
  };
}

const EventsMapPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des events.");
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Chargement...</p>;
  if (error)
    return <p className="text-center text-red-500">Erreur : {error}</p>;

  return (
    <div className="flex flex-col items-center p-4">
      {events.length > 0 ? (
        <EventMapCard
          lat={events[0].Bar.localisationX}
          lng={events[0].Bar.localisationY}
          markers={events.map((event) => ({
            id: event.Bar.id,
            name: event.Bar.name,
            localisationX: event.Bar.localisationX,
            localisationY: event.Bar.localisationY,
          }))}
        />
      ) : (
        <p className="text-center text-gray-500">Aucun event trouvé.</p>
      )}
    </div>
  );
};

export default EventsMapPage;
