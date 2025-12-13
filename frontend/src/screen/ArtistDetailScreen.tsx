import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchArtistDetail } from "../service/api";

export default function ArtistDetailScreen({ route, navigation }: any) {
    const { id } = route.params;
    const { data: artist, isLoading, error } = useQuery({
        queryKey: ["artistDetail", id],
        queryFn: () => fetchArtistDetail(id),
    });

    if (isLoading) return (
        <View style={styles.container}>
            <Text style={styles.loading}>Loading...</Text>
        </View>
    );
    if (error) return (
        <View style={styles.container}>
            <Text style={styles.error}>Error loading artist</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.photoContainer}>
                <Image
                    source={{ uri: artist.photo }}
                    style={styles.photo}
                    resizeMode="cover"
                />
                <View style={styles.playButtonLarge}>
                    <Text style={styles.playIconLarge}>▶</Text>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>{artist.name}</Text>
                <Text style={styles.genre}>{artist.genre || "Gnawa"}</Text>

                <View style={styles.descriptionBox}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <Text style={styles.description}>
                        {artist.description || "No description available"}
                    </Text>
                </View>

                <View style={styles.genreBox}>
                    <Text style={styles.sectionTitle}>Genre</Text>
                    <View style={styles.genreTag}>
                        <Text style={styles.genreTagText}>{artist.genre || "Gnawa"}</Text>
                    </View>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.followButton}>
                        <Text style={styles.followButtonText}>Follow Artist</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.bookButton} onPress={() =>
                    navigation.navigate("Booking", {
                        eventId: 1, // ⚠️ مؤقت، بدلو بالـ event الحقيقي
                    })
                }>
                    <Text style={styles.bookButtonText}>Book Tickets</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    photoContainer: {
        position: "relative",
        marginHorizontal: 20,
        marginBottom: 20,
    },
    photo: {
        width: "100%",
        height: 320,
        borderRadius: 15,
    },
    playButtonLarge: {
        position: "absolute",
        bottom: 15,
        right: 15,
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: "rgba(124, 58, 237, 0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    playIconLarge: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    name: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 8,
    },
    genre: {
        fontSize: 16,
        color: "#7c3aed",
        fontWeight: "600",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    descriptionBox: {
        backgroundColor: "#2a2a3e",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: "#ccc",
        lineHeight: 22,
    },
    genreBox: {
        backgroundColor: "#2a2a3e",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    genreTag: {
        backgroundColor: "#7c3aed",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignSelf: "flex-start",
    },
    genreTagText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "600",
    },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10,
    },
    followButton: {
        flex: 1,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#7c3aed",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    followButtonText: {
        color: "#7c3aed",
        fontSize: 14,
        fontWeight: "bold",
    },
    shareButton: {
        flex: 1,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#666",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    shareButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    bookButton: {
        backgroundColor: "#7c3aed",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 10,
    },
    bookButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loading: {
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
        marginTop: 50,
    },
    error: {
        textAlign: "center",
        color: "#ff6b6b",
        fontSize: 16,
        marginTop: 50,
    },
});