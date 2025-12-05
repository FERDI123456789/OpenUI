import { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";

export default function Main({ userId }: { userId?: string }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false); // Track if already initialized

  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL);
      setClient(convex);
      initializedRef.current = true; // mark as initialized
    }
  }, []);

  if (!client) {
    return null; // Don't show skeletons again if you want them gone
  }

  return (
    <ConvexProvider client={client}>
      <App profileId={userId} />
    </ConvexProvider>
  );
}
