import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { createBooking } from "../service/api";
import { useUserStore } from "../store/BookingsStore";

export default function BookingScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { email, artistId, setEmail, setArtistId } = useUserStore();

    const eventData = {
        name: "La Grande Soirée Gnawa",
        date: "Oct 24 - 8:00 PM",
        location: "Agadir, Marrakech",
        price: 150,
    };

    const validateEmail = (emailToCheck: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailToCheck);
    };

    const handleBooking = async () => {
        if (!name.trim())
            return Alert.alert("Error", "Please enter your full name");
        if (!email.trim())
            return Alert.alert("Error", "Please enter your email");
        if (!validateEmail(email))
            return Alert.alert("Error", "Please enter a valid email");
        if (!artistId)
            return Alert.alert("Error", "Please select an artist");

        const bookingData = {
            customer_name: name.trim(),
            customer_email: email.trim(),
            artist_id: artistId,
        };

        setIsLoading(true);
        try {
            await createBooking(bookingData);

            Alert.alert("Success", "Booking confirmed 🎉", [{
                text: "OK",
                onPress: () => navigation.navigate("MyBookings"),
            },]);
            setName("");
        } catch (error: any) {
            Alert.alert(
                "Error",
                error.response?.data?.message || "Failed to create booking"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backBtn}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Complete Reservation</Text>
            </View>

            <View style={styles.eventCard}>
                <View style={styles.eventIconBg}>
                    <Text style={styles.eventIcon}>🎵</Text>
                </View>
                <View style={styles.eventInfo}>
                    <Text style={styles.eventName}>{eventData.name}</Text>
                    <Text style={styles.eventMetaText}>📅 {eventData.date}</Text>
                    <Text style={styles.eventMetaText}>📍 {eventData.location}</Text>
                </View>
            </View>

            <View style={styles.formSection}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Karim Bennani"
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="name@example.com"
                        placeholderTextColor="#888"
                    />
                    <Text style={styles.helperText}>
                        You'll need this for your ticket
                    </Text>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Select Artist</Text>
                    <View style={styles.artistGrid}>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((id) => (
                            <TouchableOpacity
                                key={id}
                                style={[
                                    styles.artistBtn,
                                    artistId === id && styles.artistBtnActive,
                                ]}
                                onPress={() => setArtistId(id)}
                            >
                                <Text
                                    style={[
                                        styles.artistBtnText,
                                        artistId === id &&
                                        styles.artistBtnTextActive,
                                    ]}
                                >
                                    {id}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.priceCard}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Ticket Price</Text>
                        <Text style={styles.priceValue}>
                            {eventData.price} MAD
                        </Text>
                    </View>
                    <View style={styles.priceDivider} />
                    <View style={styles.priceRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalPrice}>
                            {eventData.price} MAD
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[
                        styles.confirmBtn,
                        isLoading && styles.confirmBtnDisabled,
                    ]}
                    onPress={handleBooking}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <Text style={styles.confirmBtnText}>
                        {isLoading
                            ? "Processing..."
                            : `Confirm Booking · ${eventData.price} MAD`}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.terms}>
                    By completing this reservation, you agree to our terms and
                    conditions
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#1a1a2e" },
    header: { flexDirection: "row", alignItems: "center", padding: 16, marginTop: 10 },
    backBtn: { color: "#999", fontSize: 14, fontWeight: "500" },
    headerTitle: { flex: 1, fontSize: 18, fontWeight: "600", color: "#fff", marginLeft: 20 },
    eventCard: { flexDirection: "row", backgroundColor: "#2a2a3e", marginHorizontal: 20, borderRadius: 16, padding: 16, marginBottom: 30, alignItems: "center", gap: 12 },
    eventIconBg: { width: 60, height: 60, backgroundColor: "#7c3aed", borderRadius: 12, justifyContent: "center", alignItems: "center" },
    eventIcon: { fontSize: 32 },
    eventInfo: { flex: 1 },
    eventName: { fontSize: 16, fontWeight: "700", color: "#fff", marginBottom: 6 },
    eventMetaText: { fontSize: 12, color: "#aaa" },
    formSection: { paddingHorizontal: 20, paddingBottom: 40 },
    inputWrapper: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: "600", color: "#fff", marginBottom: 10 },
    input: { backgroundColor: "#2a2a3e", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, color: "#fff", fontSize: 16, borderWidth: 1, borderColor: "#444" },
    helperText: { fontSize: 12, color: "#888", marginTop: 6 },
    artistGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    artistBtn: { width: "23%", paddingVertical: 12, backgroundColor: "#2a2a3e", borderRadius: 10, alignItems: "center", borderWidth: 1, borderColor: "#444" },
    artistBtnActive: { backgroundColor: "#7c3aed", borderColor: "#7c3aed" },
    artistBtnText: { color: "#aaa", fontWeight: "600", fontSize: 16 },
    artistBtnTextActive: { color: "#fff" },
    priceCard: { backgroundColor: "#2a2a3e", borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#444" },
    priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    priceLabel: { fontSize: 14, color: "#aaa" },
    priceValue: { fontSize: 14, fontWeight: "600", color: "#fff" },
    priceDivider: { height: 1, backgroundColor: "#444", marginVertical: 12 },
    totalLabel: { fontSize: 14, fontWeight: "600", color: "#fff" },
    totalPrice: { fontSize: 18, fontWeight: "700", color: "#7c3aed" },
    confirmBtn: { backgroundColor: "#7c3aed", borderRadius: 12, paddingVertical: 16, alignItems: "center", marginBottom: 16, elevation: 4 },
    confirmBtnDisabled: { opacity: 0.6 },
    confirmBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    terms: { fontSize: 12, color: "#777", textAlign: "center", lineHeight: 18 },
});
