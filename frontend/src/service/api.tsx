import axios from "axios";
import { API_URL } from "../constants/Url";

console.log("🔗 API URL:", API_URL);

export const fetchEventInfo = async () => {
    console.log("📡 Calling:", `${API_URL}/eventinfo`);
    const res = await axios.get(`${API_URL}/eventinfo`);
    return res.data;
};

export const fetchArtists = async () => {
    console.log("🎤 Calling:", `${API_URL}/artist`);
    const res = await axios.get(`${API_URL}/artist`);
    console.log("🎤 Artists API:", res.data);
    return res.data;
};

export const fetchArtistDetail = async (id: string) => {
    console.log("🎤 Calling:", `${API_URL}/artist/${id}`);
    const res = await axios.get(`${API_URL}/artist/${id}`);
    return res.data;
};

export const createBooking = async (data: any) => {
    console.log("📤 Creating booking at:", `${API_URL}/bookings`);
    console.log("📤 Booking data:", data);
    const res = await axios.post(`${API_URL}/bookings`, data);
    return res.data;
};

export const fetchBookingsByEmail = async (email: string) => {
    console.log("📨 Calling:", `${API_URL}/bookings/email/${email}`);
    const res = await axios.get(`${API_URL}/bookings/email/${email}`);
    return res.data;
};

export const fetchAllBookings = async () => {
    try {
        const url = `${API_URL}/bookings`;
        console.log("📋 Calling:", url);

        const res = await axios.get(url);
        console.log("✅ Response status:", res.status);
        console.log("✅ Response data:", res.data);

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


export const saveDraft = async (data: {
    id?: number;
    customer_name: string;
    customer_email: string;
    artist_id: number | null;
    is_draft: boolean;
}) => {
    try {
        if (data.id) {
            console.log("📝 Updating draft:", data.id);
            const res = await axios.put(`${API_URL}/bookings/${data.id}`, data);
            return res.data;
        } else {
            console.log("📝 Saving new draft");
            const res = await axios.post(`${API_URL}/bookings`, data);
            return res.data;
        }
    } catch (error) {
        console.error("❌ Failed to save draft:", error);
        throw error;
    }
};

export const getDraft = async () => {
    try {
        console.log("📂 Fetching draft");
        const res = await axios.get(`${API_URL}/bookings/draft`);
        return res.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            console.log("📂 No draft found");
            return null;
        }
        console.error("❌ Failed to fetch draft:", error);
        throw error;
    }
};

export const deleteDraft = async (draftId: number) => {
    try {
        console.log("🗑️ Deleting draft:", draftId);
        const res = await axios.delete(`${API_URL}/bookings/${draftId}`);
        return res.data;
    } catch (error) {
        console.error("❌ Failed to delete draft:", error);
        throw error;
    }
};