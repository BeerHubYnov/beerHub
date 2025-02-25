import { useEffect, useState } from "react";
import "./EventListComponent.css";
import EventCard from "./EventCard";

interface Event {
  id: string;
  dateHour: string;
  title: string;
  description: string;
  id_Bar: string;
  category: string;
  Bar: {
    id: string;
    name: string;
    description: string;
    happyHoure: string;
    localisationX: number;
    localisationY: number;
  };
}

const EventListComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/event");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des évènements.");
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        setErrorMessage("Impossible de charger les évènements.");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bar-list-container">
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="bar-list">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>Chargement des évènements...</p>
        )}
      </div>
    </div>
  );
};

export default EventListComponent;
