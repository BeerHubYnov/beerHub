import React from "react";
import EventListComponent from "./../components/event-list/EventListComponent";
import EventsMapPage from "./EventsMapPage";
const EventList: React.FC = () => {
  return (
    <div className="profil">
      <h2>Liste des Events</h2>
      <div className="bars-page">
        <EventListComponent />
        <EventsMapPage />
      </div>
    </div>
  );
};
export default EventList;
