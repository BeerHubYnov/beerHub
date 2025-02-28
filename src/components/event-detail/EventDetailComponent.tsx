import React from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import MapComponent from "../Map/MapComponent";

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

interface EventDetailComponentProps {
  event: Event;
}

const EventDetailComponent: React.FC<EventDetailComponentProps> = ({
  event,
}) => {
  return (
    <div className="profil-event">
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

        <br />
        <hr />
        <br />

        <NavLink to={`/event-edit/${event.id}`}>
          <EditIcon /> Modifier
        </NavLink>
        <br />
        <NavLink to={`/event-delete/${event.id}`}>
          <DeleteForeverIcon /> Supprimer
        </NavLink>
      </div>
      <div className="map-event">
        {" "}
        {/* Affichage de la carte */}
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
