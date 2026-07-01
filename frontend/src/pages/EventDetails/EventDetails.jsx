import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../services/eventService";
import { bookTicket } from "../../services/bookingService";

function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {

        const fetchEvent = async () => {

            try {

                const data = await getEventById(id);
                setEvent(data.event);

            } catch (error) {
                console.log(error);
            }

        };

        fetchEvent();

    }, [id]);

    if (!event) return <h2>Loading...</h2>;

    const handleBooking = async () => {

    try {

        const data = await bookTicket(event._id, 1);

        alert("Ticket Booked Successfully!");

        console.log(data);

    } catch (error) {

        alert(error.response?.data?.message || "Booking Failed");

    }

};

    return (

        <div style={{ padding: "30px" }}>

            <h1>{event.title}</h1>

            <p><b>Description:</b> {event.description}</p>

            <p><b>Category:</b> {event.category}</p>

            <p><b>Location:</b> {event.location}</p>

            <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>

            <p><b>Time:</b> {event.time}</p>

            <p><b>Price:</b> ₹ {event.price}</p>

            <p><b>Tickets Left:</b> {event.availableTickets}</p>

           <button onClick={handleBooking}>
            Book Ticket
            </button>

        </div>

    );

}

export default EventDetails;