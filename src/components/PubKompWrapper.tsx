import { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import PublicComponentsList from "./PublicComponents";

export default function PubKompWrapper() {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL);
      setClient(convex);
      initializedRef.current = true; // mark as initialized
    }
  }, []);

  // Optionally, show nothing until client is ready to prevent ghost blocks
  if (!client) return null;

  return (
    <ConvexProvider client={client}>
      <PublicComponentsList />
    </ConvexProvider>
  );
}
