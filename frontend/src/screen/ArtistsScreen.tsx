import React from "react";
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "../service/api";

interface Artist {
    id: string;
    name: string;
    photo: string;
    genre?: string;
}

export default function ArtistsScreen({ navigation }: any) {
    const { data: artists, isLoading } = useQuery<Artist[]>({
        queryKey: ["artists"],
        queryFn: fetchArtists,
    });

    const filteredArtists = artists || [];

    if (isLoading) return <View style={styles.container}><Text>Loading...</Text></View>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>The Mellems</Text>
            </View>

            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <Text style={styles.searchText}>Search artists or genres...</Text>
            </View>
            <ScrollView style={styles.gridContainer}>
                <View style={styles.grid}>
                    {filteredArtists.map((artist) => (
                        <TouchableOpacity
                            key={artist.id}
                            style={styles.artistCard}
                            onPress={() => navigation.navigate("ArtistDetail", { id: artist.id })}
                        >
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: artist.photo }}
                                    style={styles.artistImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.playButton}>
                                    <Text style={styles.playIcon}>▶</Text>
                                </View>
                            </View>
                            <Text style={styles.artistName}>{artist.name}</Text>
                            <Text style={styles.artistGenre}>{artist.genre || "Gnawa"}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Tickets</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a2e",
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#1a1a2e",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        marginVertical: 10,
        backgroundColor: "#2a2a3e",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    searchIcon: {
        marginRight: 10,
        fontSize: 16,
    },
    searchText: {
        color: "#999",
        fontSize: 14,
    },
    gridContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    artistCard: {
        width: "48%",
        marginBottom: 20,
    },
    imageWrapper: {
        position: "relative",
        marginBottom: 10,
    },
    artistImage: {
        width: "100%",
        height: 180,
        borderRadius: 12,
    },
    playButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    playIcon: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    artistName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 4,
    },
    artistGenre: {
        fontSize: 12,
        color: "#999",
    },
    bookButton: {
        backgroundColor: "#7c3aed",
        marginHorizontal: 20,
        marginVertical: 15,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    bookButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});