// src/service/bookingHandler.ts
import { Alert } from "react-native";
import { createBooking } from "./api";

interface BookingParams {
    email: string;
    artistId: number;
    navigation: any;
    setIsLoading: (v: boolean) => void;
}

export const handleBooking = async ({
    email,
    artistId,
    navigation,
    setIsLoading,
}: BookingParams) => {
    if (!email.trim()) {
        Alert.alert("Error", "Please enter your email");
        return;
    }

    if (!artistId) {
        Alert.alert("Error", "Artist ID missing!");
        return;
    }

    const bookingData = {
        customer_email: email.trim(),
        customer_name: "youssef", // من بعد دير input ديالو
        artist_id: Number(artistId),
    };

    console.log("📤 Sending booking:", bookingData);

    setIsLoading(true);

    try {
        await createBooking(bookingData);

        Alert.alert("Success", "Booking confirmed 🎉", [
            {
                text: "OK",
                onPress: () =>
                    navigation.navigate("MyBookings", { email: email.trim() }),
            },
        ]);
    } catch (error: any) {
        console.error("❌ Booking error:", error.response?.data || error.message);
        Alert.alert("Error", "Failed to create booking");
    } finally {
        setIsLoading(false);
    }
};