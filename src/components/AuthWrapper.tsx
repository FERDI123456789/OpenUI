import { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import AuthPage from "./AuthPage";

export default function AuthWrapper() {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return; // only run once

    const url = import.meta.env.PUBLIC_CONVEX_URL;
    if (!url) {
      console.error("❌ Missing PUBLIC_CONVEX_URL env variable.");
      return;
    }

    const convex = new ConvexReactClient(url);
    setClient(convex);
    initializedRef.current = true; // mark as initialized
  }, []);

  // Optionally hide ghost block completely
  if (!client) return null;

  return (
    <ConvexProvider client={client}>
      <AuthPage />
    </ConvexProvider>
  );
}
