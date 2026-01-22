import { createContext } from "react";

export interface User {
  email: string;
  nickname?: string; //닉네임은 signup.tsx로 나중에
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);