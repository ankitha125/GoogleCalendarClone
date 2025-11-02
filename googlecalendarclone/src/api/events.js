import axios from "axios";

const BASE_URL = "http://localhost:3000"; 

export const getEvents = () => axios.get(`${BASE_URL}/events`);
export const createEvent = (data) => axios.post(`${BASE_URL}/events`, data);
export const updateEvent = (id, data) => axios.patch(`${BASE_URL}/events/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${BASE_URL}/events/${id}`);
