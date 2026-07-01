import { useEffect, useState } from "react";
import { getMyBookings } from "../../services/bookingService";
import { createOrder, verifyPayment } from "../../services/paymentService";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const data = await getMyBookings();
                setBookings(data.bookings);

            } catch (error) {

                console.log(error);

            }

        };

        fetchBookings();

    }, []);

    const handlePayment = async (booking) => {
    try {

        const data = await createOrder(booking._id);

        const options = {
            key: data.key_id,
            amount: data.order.amount,
            currency: data.order.currency,
            name: "EventHub",
            description: booking.event.title,
            order_id: data.order.id,

            handler: async function (response) {

                try {

                    await verifyPayment({
                        bookingId: booking._id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    });

                    alert("Payment Successful!");

                    window.location.reload();

                } catch {

                    alert("Payment Verification Failed");

                }

            },

            theme: {
                color: "#3399cc",
            },
        };

        const razor = new window.Razorpay(options);

        razor.open();

    } catch (error) {

        console.log(error);

        alert("Unable to start payment.");

    }
};

    return (

        <div style={{ padding: "30px" }}>

            <h1>My Tickets</h1>

            {bookings.length === 0 ? (

                <h3>No bookings found.</h3>

            ) : (

                bookings.map((booking) => (

                    <div
                        key={booking._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "20px",
                            marginBottom: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <h2>{booking.event.title}</h2>

                        <p>
                            <strong>Location:</strong> {booking.event.location}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(booking.event.date).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Quantity:</strong> {booking.quantity}
                        </p>

                        <p>
                            <strong>Total:</strong> ₹{booking.totalAmount}
                        </p>

                        <p>
                            <strong>Booking:</strong> {booking.bookingStatus}
                        </p>

                        <p>
                            <strong>Payment:</strong> {booking.paymentStatus}
                        </p>

                        {booking.paymentStatus === "Pending" && (
                        <button onClick={() => handlePayment(booking)}>
                        Pay Now
                        </button>
                        )}

                        <img
                            src={booking.qrCode}
                            width="180"
                            alt="QR Code"
                        />

                    </div>

                ))

            )}

        </div>

    );

}

export default MyBookings;