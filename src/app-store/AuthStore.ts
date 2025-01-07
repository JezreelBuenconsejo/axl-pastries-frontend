import { create } from 'zustand'

// Define the shape of your authentication store
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  setAuth: (token: string) => void;
  clearAuth: () => void;
}

// Create the Zustand store
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  setAuth: (token) =>
    set({
      isLoggedIn: true,
      token,
    }),
  clearAuth: () =>
    set({
      isLoggedIn: false,
      token: null,
    }),
}));

export default useAuthStore;
