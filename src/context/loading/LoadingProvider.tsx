import { useState } from "react";
import type { ReactNode } from "react";
import { LoadingContext } from "./LoadingContext";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && <LoadingOverlay />}
    </LoadingContext.Provider>
  );
}
