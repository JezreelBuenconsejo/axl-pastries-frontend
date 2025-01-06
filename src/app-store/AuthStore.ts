import { create } from 'zustand'

// Define the shape of your authentication store
interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
  setAuth: (token: string, username: string) => void;
  clearAuth: () => void;
}

// Create the Zustand store
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: null,
  token: null,
  setAuth: (token, username) =>
    set({
      isLoggedIn: true,
      token,
      username,
    }),
  clearAuth: () =>
    set({
      isLoggedIn: false,
      token: null,
      username: null,
    }),
}));

export default useAuthStore;
