import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import ArtistsScreen from "../screen/ArtistsScreen";
import ArtistDetailScreen from "../screen/ArtistDetailScreen";
import BookingScreen from "../screen/BookingScreen";
import MyBookingsScreen from "../screen/MyBookingsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Artists" component={ArtistsScreen} />
            <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        </Stack.Navigator>
    );
}
