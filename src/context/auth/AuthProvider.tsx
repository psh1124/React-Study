import { useState } from "react";
import { AuthContext, type AuthContextType, type User } from "./AuthContext";
import { storage, STORAGE_KEYS } from "../../constants/storage";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() =>
    storage.get<User | null>(STORAGE_KEYS.USER, null),
  );

  const login = (userData: User) => {
    setUser(userData);
    storage.set(STORAGE_KEYS.USER, userData);
  };

  const logout = () => {
    setUser(null);
    storage.remove(STORAGE_KEYS.USER);
  };

  const value: AuthContextType = {
    isLoggedIn: !!user,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
