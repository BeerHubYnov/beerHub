import { NavLink } from "react-router-dom";
import "./EventCard.css";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bar-card" data-testid="event-card">
      <h3>{event.title}</h3>
      <p>
        <strong>Catégorie :</strong> {event.category}
      </p>
      <p>
        <strong>Description :</strong> {event.description}
      </p>

      <NavLink to={`/event/${event.id}`} className="bar-btn">
        {" "}
        <RemoveRedEyeIcon /> Voir
      </NavLink>
      <br />
    </div>
  );
};

export default EventCard;
