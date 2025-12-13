import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchBookingsByEmail } from "../service/api";

interface Booking {
    code: string;
    eventId: number;
    seats: number;
    userEmail: string;
}

export default function MyBookings({ route }: any) {
    const email: string = route?.params?.email || "test@example.com";

    // ✅ Hna khassna n3ti object f useQuery
    const { data, isLoading, error }: UseQueryResult<Booking[], Error> = useQuery<Booking[], Error>({
        queryKey: ["bookings", email],        // key dyal query
        queryFn: () => fetchBookingsByEmail(email), // function li katjib data
    });

    const bookings: Booking[] = data || [];

    if (isLoading) return <Text style={styles.center}>Loading...</Text>;
    if (error) return <Text style={styles.center}>Error loading bookings</Text>;
    if (bookings.length === 0) return <Text style={styles.center}>No bookings yet</Text>;

    return (
        <FlatList
            data={bookings} // dima array
            keyExtractor={(item: Booking) => item.code}
            renderItem={({ item }: { item: Booking }) => (
                <View style={styles.card}>
                    <Text style={styles.code}>Booking Code: {item.code}</Text>
                    <Text>Event ID: {item.eventId}</Text>
                    <Text>Seats: {item.seats}</Text>
                </View>
            )}
            contentContainerStyle={{ padding: 20 }}
        />
    );
}

const styles = StyleSheet.create({
    center: { textAlign: "center", marginTop: 50, color: "#fff" },
    card: { backgroundColor: "#2a2a3e", padding: 20, marginBottom: 15, borderRadius: 12 },
    code: { color: "#fff", fontWeight: "bold", marginBottom: 5 },
});
