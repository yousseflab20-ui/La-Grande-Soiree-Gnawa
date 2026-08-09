import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        console.log("Error storing data", err);
    }
};

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (err) {
        console.log("Error reading data", err);
        return null;
    }
};

