import React from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  dateHour: string;

}

interface EventDetailComponentProps {
  event: Event;
}

const EventDetailComponent: React.FC<EventDetailComponentProps> = ({ event }) => {
  return (
    <div className="profil">
      <div className="card-event">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Happy Hour : {event.dateHour}</p>
      </div>

     
      
      {/* Ajouter une carte ou autre information si nécessaire */}
    </div>
  );
};

export default EventDetailComponent;
