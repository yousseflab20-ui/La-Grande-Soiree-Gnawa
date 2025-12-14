import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`[AsyncStorage] set ${key} = ${value}`);
    } catch (e) {
        console.log("Error storing data", e);
    }
};

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log(`[AsyncStorage] get ${key} => ${value}`);
        return value;
    } catch (e) {
        console.log("Error reading data", e);
        return null;
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`[AsyncStorage] delete ${key}`);
    } catch (e) {
        console.log("Error removing data", e);
    }
};
