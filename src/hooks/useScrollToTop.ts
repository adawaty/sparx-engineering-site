// Fix for scroll issues with hash router and absolute positioning in animations
import { useEffect } from "react";
import { useLocation } from "wouter";

export function useScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
