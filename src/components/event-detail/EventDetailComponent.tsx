import React from "react";

interface Event {
  id: string;
  name: string;
  description: string;
  dateHour: string;

}

interface EventDetailComponentProps {
  event: Event;
}

const EventDetailComponent: React.FC<EventDetailComponentProps> = ({ event }) => {
  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>Happy Hour : {event.dateHour}</p>
     
      
      {/* Ajouter une carte ou autre information si nécessaire */}
    </div>
  );
};

export default EventDetailComponent;
