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
      <p><strong>Date :</strong> {new Date(event.dateHour).toLocaleString()}</p>
      <p><strong>Lieu :</strong> {event.Bar.name}</p>
      <p><strong>Happy Hour :</strong> {event.Bar.happyHoure}</p>
      <p><strong>Localisation :</strong> {event.Bar.localisationX}, {event.Bar.localisationY}</p>
      <NavLink to={`/event/${event.id}`}>Voir les détails</NavLink>
      <br />
      <NavLink to={`/event-edit/${event.id}`}>Modifier</NavLink>
      <br />
      <NavLink to={`/event-delete/${event.id}`}>Supprimer</NavLink>
    </div>
  );
};

export default EventCard;
