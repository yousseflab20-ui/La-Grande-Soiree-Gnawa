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
import { fetchAllBookings, fetchArtists } from "../service/api";

interface Booking {
    id?: number;
    code?: string;
    artist_id: number;
    customer_email: string;
    customer_name?: string;
    created_at?: string;
}

interface Artist {
    id: number;
    name: string;
    genre?: string;
}

export default function MyBookings({ navigation }: any) {
    const { data: bookings, isLoading, error, refetch } = useQuery({
        queryKey: ["allBookings"],
        queryFn: fetchAllBookings,
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

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Unknown";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Text style={styles.backBtn}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Bookings</Text>
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.loadingText}>Loading bookings...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Text style={styles.backBtn}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Bookings</Text>
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.errorIcon}>⚠️</Text>
                    <Text style={styles.errorText}>Error loading bookings</Text>
                    <Text style={styles.errorSubtext}>
                        {error instanceof Error ? error.message : "Unknown error"}
                    </Text>
                    <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
                        <Text style={styles.retryBtnText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    if (!bookings || bookings.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Text style={styles.backBtn}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>All Bookings</Text>
                </View>
                <View style={styles.centerContent}>
                    <Text style={styles.emptyIcon}>🎫</Text>
                    <Text style={styles.emptyText}>No bookings yet</Text>
                    <Text style={styles.emptySubtext}>
                        No reservations have been made
                    </Text>
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
                <Text style={styles.headerTitle}>All Bookings</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{bookings.length}</Text>
                </View>
            </View>

            <FlatList
                data={bookings}
                keyExtractor={(item, index) =>
                    item.id?.toString() || item.code || index.toString()
                }
                contentContainerStyle={styles.list}
                scrollEnabled={true}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                    <View style={styles.bookingCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.artistName}>
                                    {getArtistName(item.artist_id)}
                                </Text>
                                <Text style={styles.genre}>
                                    {getArtistGenre(item.artist_id)}
                                </Text>
                                {item.created_at && (
                                    <Text style={styles.dateText}>
                                        📅 {formatDate(item.created_at)}
                                    </Text>
                                )}
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
                                <Text style={styles.infoValue} numberOfLines={1}>
                                    {item.customer_email}
                                </Text>
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
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.actionBtnSecondary]}
                            >
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
    badge: {
        backgroundColor: "#7c3aed",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
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
    errorIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    errorText: {
        fontSize: 16,
        color: "#ff6b6b",
        marginBottom: 8,
        fontWeight: "600",
    },
    errorSubtext: {
        fontSize: 12,
        color: "#888",
        marginBottom: 16,
        textAlign: "center",
    },
    retryBtn: {
        backgroundColor: "#7c3aed",
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryBtnText: {
        color: "#fff",
        fontWeight: "600",
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
        alignItems: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#1a1a2e",
    },
    headerLeft: {
        flex: 1,
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
        marginBottom: 6,
    },
    dateText: {
        fontSize: 11,
        color: "#888",
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