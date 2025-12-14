import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const queryClient = new QueryClient();


const Stack = createNativeStackNavigator();

const linking = {
    prefixes: ["frontend://", " http://localhost:4000"],
    config: {
        screens: {
            Home: "home",
            Artists: "artists",
            ArtistDetail: "artist/:artistId",
            Booking: "booking/:artistId",
            MyBookings: "mybookings/:email",
        },
    },
};
export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking}>
                <AppNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}