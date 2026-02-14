// Ensure this component always returns something visual
import { useEffect } from "react";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return children;
}
