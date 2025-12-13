import React from "react";
import { View, ScrollView, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "../service/api";
import ArtistCard from "../components/ArtistCard";

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

    if (isLoading) return <View><Text>Loading...</Text></View>;
    if (!artists) return <View><Text>No artists found</Text></View>;

    return (
        <ScrollView>
            {artists.map((artist) => (
                <View
                    key={artist.id}
                    style={{ padding: 15, margin: 10, backgroundColor: "#fff", borderRadius: 10 }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{artist.name}</Text>
                    <Text>{artist.genre || "Gnawa"}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
