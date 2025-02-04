import { useParams } from "react-router-dom";
import EventDeleteComponent from "../components/event-delete/EventDeleteComponent";

const EventDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Erreur : ID de l event non trouvé.</p>;
  }

  return <EventDeleteComponent eventId={id} />;
};

export default EventDeletePage;
