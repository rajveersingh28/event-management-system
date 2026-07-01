import api from "./api";

export const bookTicket = async (eventId, quantity = 1) => {
    const response = await api.post("/bookings", {
        eventId,
        quantity
    });

    return response.data;
};

export const getMyBookings = async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
};