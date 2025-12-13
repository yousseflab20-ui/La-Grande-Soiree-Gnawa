import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Url";

export default function ArtistCard({ artist, onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress} style={{ margin: 10, padding: 10, backgroundColor: COLORS.secondary, borderRadius: 10 }}>
            <Image source={{ uri: artist.photo }} style={{ width: "100%", height: 150, borderRadius: 10 }} />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{artist.name}</Text>
            <Text>{artist.genre}</Text>
        </TouchableOpacity>
    );
}
