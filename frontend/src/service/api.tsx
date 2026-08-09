import axios from "axios";
import { API_URL } from "../constants/Url";


export const fetchEventInfo = async () => {
    const res = await axios.get(`${API_URL}/eventinfo`);
    return res.data;
};

export const fetchArtists = async () => {
    const res = await axios.get(`${API_URL}/artist`);
    return res.data;
};

export const fetchArtistDetail = async (id: string) => {
    const res = await axios.get(`${API_URL}/artist/${id}`);
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

export const fetchAllBookings = async () => {
    try {
        const url = `${API_URL}/bookings`;

        const res = await axios.get(url);

        if (Array.isArray(res.data)) {
            return res.data;
        } else if (res.data?.data && Array.isArray(res.data.data)) {
            return res.data.data;
        } else {
            console.warn("⚠️ Unexpected response format:", res.data);
            return [];
        }
    } catch (error: any) {
        console.error("❌ Error fetching bookings");
        console.error("❌ Error message:", error.message);
        console.error("❌ Error status:", error.response?.status);
        console.error("❌ Error data:", error.response?.data);
        console.error("❌ Full error:", error);
        throw error;
    }
};