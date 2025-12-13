import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator'
import { NavigationContainer } from "@react-navigation/native"
const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}