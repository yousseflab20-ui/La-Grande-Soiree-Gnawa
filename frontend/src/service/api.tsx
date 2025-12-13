import axios from "axios";
import { API_URL } from "../constants/Url";

export const fetchEventInfo = async () => {
    const res = await axios.get(`${API_URL}/eventinfo`);
    return res.data;
};

export const fetchArtists = async () => {
    const res = await axios.get(`${API_URL}/artist`);
    console.log("🎤 Artists API:", res.data);
    return res.data;
};

export const fetchArtistDetail = async (id: string) => {
    const res = await axios.get(`${API_URL}/artists/${id}`);
    return res.data;
};

export const createBooking = async (data: any) => {
    const res = await axios.post(`${API_URL}/bookings`, data);
    return res.data;
};

export const fetchBookingsByEmail = async (email: string) => {
    const res = await axios.get(`${API_URL}/bookings/email/${email}`);
    return res.data;
};
