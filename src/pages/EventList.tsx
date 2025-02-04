import React from "react";
import EventListComponent from './../components/event-list/EventListComponent'


const EventList: React.FC = () => {
    return (
        <>
        <div className="profil">
        <h2>Liste des Events</h2>

<EventListComponent/>

        </div>

        </>
    );
};
export default EventList;