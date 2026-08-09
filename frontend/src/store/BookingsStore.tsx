import { create } from "zustand";

interface UserState {
    email: string;
    artistId: number | null;

    setEmail: (email: string) => void;
    setArtistId: (id: number) => void;
    reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    email: "",
    artistId: null,

    setEmail: (email) => set({ email }),
    setArtistId: (artistId) => set({ artistId }),

    reset: () => set({ email: "", artistId: null }),
}));
