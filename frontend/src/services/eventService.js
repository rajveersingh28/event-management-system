import api from "./api";

export const getAllEvents = async () => {
    const response = await api.get("/events");
    return response.data;
};

export const getEventById = async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
};

export const createEvent = async (eventData) => {
  const res = await api.post("/events", eventData);
  return res.data;
};