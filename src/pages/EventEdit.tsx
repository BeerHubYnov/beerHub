import React from "react";
import { useParams } from "react-router-dom";
import EventEditComponent from "./../components/event-edit/EventEditComponent";

const EventEdit: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // ✅ id de l'event depuis l'URL
  if (!id) {
    return <p>Erreur : ID de l'événement introuvable.</p>;
  }

  return (
    <>
      <h2>Modifier l'événement</h2>
      <EventEditComponent eventId={id} />
    </>
  );
};

export default EventEdit;
