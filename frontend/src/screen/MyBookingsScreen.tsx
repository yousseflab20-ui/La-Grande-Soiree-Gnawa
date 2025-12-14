import React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchBookingsByEmail, fetchArtists } from "../service/api";

interface Booking {
    id?: number;
    code?: string;
    artist_id: number;
    customer_email: string;
    customer_name?: string;
}

interface Artist {
    id: number;
    name: string;
    genre?: string;
}

export default function MyBookings({ route, navigation }: any) {
    const email: string = route?.params?.email;

    const { data: bookings, isLoading, error } = useQuery({
        queryKey: ["bookings", email],
        queryFn: () => fetchBookingsByEmail(email),
        enabled: !!email,
    });

    const { data: artists } = useQuery({
        queryKey: ["artists"],
        queryFn: fetchArtists,
    });

    const getArtistName = (artistId: number) => {
        if (!artists) return `Artist #${artistId}`;
        const artist = artists.find((a: Artist) => a.id === artistId);
        return artist ? artist.name : `Artist #${artistId}`;
    };

    const getArtistGenre = (artistId: number) => {
        if (!artists) return "Music";
        const artist = artists.find((a: Artist) => a.id === artistId);
        return artist?.genre || "Music";
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <Text style={styles.loadingText}>Loading your bookings...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContent}>
                    <Text style={styles.errorText}>❌ Error loading bookings</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!bookings || bookings.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Bookings</Text>
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.emptyIcon}>🎫</Text>
                    <Text style={styles.emptyText}>No bookings yet</Text>
                    <Text style={styles.emptySubtext}>Book a ticket to see it here</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <Text style={styles.backBtn}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            <FlatList
                data={bookings}
                keyExtractor={(item, index) =>
                    item.id?.toString() || item.code || index.toString()
                }
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                renderItem={({ item }) => (
                    <View style={styles.bookingCard}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.artistName}>{getArtistName(item.artist_id)}</Text>
                                <Text style={styles.genre}>{getArtistGenre(item.artist_id)}</Text>
                            </View>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>✓ Confirmed</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.cardContent}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Customer Name</Text>
                                <Text style={styles.infoValue}>
                                    {item.customer_name || "Guest"}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{item.customer_email}</Text>
                            </View>

                            {item.code && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Booking Code</Text>
                                    <Text style={styles.bookingCode}>{item.code}</Text>
                                </View>
                            )}

                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Artist ID</Text>
                                <Text style={styles.infoValue}>#{item.artist_id}</Text>
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Text style={styles.actionBtnText}>🎫 View Ticket</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnSecondary]}>
                                <Text style={styles.actionBtnTextSecondary}>⋮ More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#2a2a3e",
    },
    backBtn: {
        color: "#7c3aed",
        fontSize: 16,
        fontWeight: "600",
    },
    headerTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        marginLeft: 16,
    },

    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#888",
    },
    errorText: {
        fontSize: 16,
        color: "#ff6b6b",
    },

    list: {
        padding: 20,
        paddingBottom: 40,
    },

    bookingCard: {
        backgroundColor: "#2a2a3e",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#3a3a4e",
        elevation: 4,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#1a1a2e",
    },
    artistName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 4,
    },
    genre: {
        fontSize: 12,
        color: "#7c3aed",
        fontWeight: "500",
    },
    statusBadge: {
        backgroundColor: "#1e7e34",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        color: "#4ade80",
        fontSize: 12,
        fontWeight: "600",
    },

    divider: {
        height: 1,
        backgroundColor: "#3a3a4e",
    },

    cardContent: {
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    infoRow_last: {
        marginBottom: 0,
    },
    infoLabel: {
        fontSize: 13,
        color: "#888",
        fontWeight: "500",
    },
    infoValue: {
        fontSize: 13,
        color: "#fff",
        fontWeight: "600",
        textAlign: "right",
        flex: 1,
        marginLeft: 12,
    },
    bookingCode: {
        fontSize: 13,
        color: "#7c3aed",
        fontWeight: "700",
        textAlign: "right",
        flex: 1,
        marginLeft: 12,
        letterSpacing: 1,
    },

    cardActions: {
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#1a1a2e",
        borderTopWidth: 1,
        borderTopColor: "#3a3a4e",
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        backgroundColor: "#7c3aed",
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    actionBtnSecondary: {
        backgroundColor: "#3a3a4e",
    },
    actionBtnText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    actionBtnTextSecondary: {
        color: "#aaa",
        fontSize: 13,
        fontWeight: "600",
    },
});