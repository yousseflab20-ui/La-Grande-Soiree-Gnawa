import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import handleBooking from "../service/handleBooking";
import { createBooking } from "../service/api";
export default function BookingScreen({ route, navigation }: any) {
    const eventId = route?.params?.eventId;

    const [email, setEmail] = useState("");
    const [seats, setSeats] = useState("1");
    const [isLoading, setIsLoading] = useState(false);

    const handleBooking = async () => {
        // validation
        if (!email.trim()) {
            return Alert.alert("Error", "Please enter your email");
        }

        if (!eventId) {
            return Alert.alert("Error", "Event ID missing!");
        }

        if (parseInt(seats) <= 0) {
            return Alert.alert("Error", "Number of seats must be at least 1");
        }

        const bookingData = {
            customer_email: email.trim(),
            customer_name: "youssef", // دابا ثابتة، من بعد دير input
            artist_id: Number(eventId),
        };

        console.log("Sending booking data:", bookingData);

        setIsLoading(true);
        try {
            await createBooking(bookingData);
            Alert.alert("Success", "Booking confirmed!", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("MyBookings", { email }),
                },
            ]);
        } catch (error: any) {
            console.error("Booking error:", error.response?.data || error.message);
            Alert.alert("Error", "Failed to create booking. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Book Tickets</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                />

                <Text style={styles.label}>Number of Seats</Text>
                <View style={styles.seatsContainer}>
                    {["1", "2", "3", "4", "5"].map((n) => (
                        <TouchableOpacity
                            key={n}
                            style={[styles.seatBtn, seats === n && styles.seatActive]}
                            onPress={() => setSeats(n)}
                        >
                            <Text style={styles.seatText}>{n}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.total}>Total Price: ${(parseInt(seats) * 50).toFixed(2)}</Text>

                <TouchableOpacity
                    style={[styles.bookBtn, isLoading && styles.disabledBtn]}
                    onPress={handleBooking}
                    disabled={isLoading}
                >
                    <Text style={styles.bookBtnText}>{isLoading ? "Processing..." : "Confirm Booking"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1a1a2e", padding: 20 },
    backBtn: { marginBottom: 10 },
    backText: { color: "#fff", fontSize: 16 },
    title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
    form: {},
    label: { color: "#fff", marginBottom: 5, fontWeight: "600" },
    input: { backgroundColor: "#2a2a3e", color: "#fff", borderRadius: 10, padding: 12, marginBottom: 20 },
    seatsContainer: { flexDirection: "row", gap: 10, marginBottom: 20 },
    seatBtn: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: "#2a2a3e", alignItems: "center" },
    seatActive: { backgroundColor: "#7c3aed" },
    seatText: { color: "#fff", fontWeight: "bold" },
    total: { color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 20 },
    bookBtn: { backgroundColor: "#7c3aed", padding: 14, borderRadius: 10, alignItems: "center" },
    disabledBtn: { opacity: 0.6 },
    bookBtnText: { color: "#fff", fontWeight: "bold" },
});
