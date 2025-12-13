import { Button, Text, TouchableOpacity, View } from "react-native";

export default function ArtistDetailScreen({ navigation }: any) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('SomeScreen');
            }}
        >
            Go somewhere
        </TouchableOpacity>
    )
}