import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../services/eventService";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        const fetchEvents = async () => {

            try {

                const data = await getAllEvents();
                setEvents(data.events);

            } catch (error) {
                console.log(error);
            }

        };

        fetchEvents();

    }, []);

    return (

        <div style={{ padding: "30px" }}>

            <h1>All Events</h1>

            {events.map((event) => (

                <div
                    key={event._id}
                    style={{
                        border: "1px solid gray",
                        margin: "15px",
                        padding: "15px",
                    }}
                >

                    <h2>{event.title}</h2>

                    <p>{event.location}</p>

                    <p>₹ {event.price}</p>

                    <Link to={`/events/${event._id}`}>
                        View Details
                    </Link>

                </div>

            ))}

        </div>

    );

}

export default Events;