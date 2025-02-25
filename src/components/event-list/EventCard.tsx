import { NavLink } from "react-router-dom";
import "./EventCard.css";

interface Event {
  id: string;
  dateHour: string;
  title: string;
  description: string;
  id_Bar: string;
  Bar: {
    id: string;
    name: string;
    description: string;
    happyHoure: string;
    localisationX: number;
    localisationY: number;
  };
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bar-card">
      <h3>{event.title}</h3>
      <p><strong>Description :</strong> {event.description}</p>

      <NavLink to={`/event/${event.id}`}>Voir les détails</NavLink>
      <br />

    </div>
  );
};

export default EventCard;
