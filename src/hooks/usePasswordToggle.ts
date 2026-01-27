import { useState } from "react";

export const usePasswordToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible((prev) => !prev);
  const type = isVisible ? "text" : "password";

  return { isVisible, toggle, type };
};
