import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MapComponent from "../Map/MapComponent";
import "./EventDetailComponent.css";

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

interface EventDetailComponentProps {
  event: Event;
}

const EventDetailComponent: React.FC<EventDetailComponentProps> = ({
  event,
}) => {
  const userId = localStorage.getItem("userId");
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (userId && event?.Bar?.id_User === userId) {
      // Vérifie event.Bar.id_User
      setIsOwner(true);
    }
  }, [userId, event]);

  return (
    <div className="profil-event profil">
      <div className="card-event">
        <h3>{event.title}</h3>
        <p>
          <strong>Description :</strong> {event.description}
        </p>
        <p>
          <strong>Catégorie :</strong> {event.category}
        </p>
        <p>
          <strong>Date :</strong> {new Date(event.dateHour).toLocaleString()}
        </p>
        <p>
          <strong>Lieu :</strong> {event.Bar.name}
        </p>
        <p>
          <strong>Happy Hour :</strong> {event.Bar.happyHoure}
        </p>
        <p>
          <strong>Localisation :</strong> {event.Bar.localisationX},{" "}
          {event.Bar.localisationY}
        </p>

        {isOwner && (
          <>
            <hr />
            <NavLink to={`/event-edit/${event.id}`}>
              <EditIcon /> Modifier
            </NavLink>
            <br />
            <NavLink to={`/event-delete/${event.id}`}>
              <DeleteForeverIcon /> Supprimer
            </NavLink>
          </>
        )}
      </div>

      <div className="map-event">
        <h3>Localisation</h3>
        <div style={{ height: "400px", width: "100%" }}>
          <MapComponent
            lat={event.Bar.localisationX}
            lng={event.Bar.localisationY}
            markers={[
              {
                id: event.Bar.id,
                name: event.Bar.name,
                localisationX: event.Bar.localisationX,
                localisationY: event.Bar.localisationY,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailComponent;
