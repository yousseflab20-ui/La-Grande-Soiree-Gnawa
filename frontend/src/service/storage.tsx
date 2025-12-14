import { MMKV } from "react-native-mmkv";

// storage.ts temporary
export const storage = {
    set: (key: string, value: string) => {
        console.log(`[storage] set ${key} = ${value}`);
    },
    getString: (key: string) => {
        console.log(`[storage] get ${key}`);
        return null;
    },
};
