import { useEffect, useState, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App";

export default function Main({
  userId,
  Provider,
}: {
  userId?: string;
  Provider?: any;
}) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const initializedRef = useRef(false); // Track if already initialized
  console.log(Provider);
  useEffect(() => {
    if (!initializedRef.current) {
      const convex = new ConvexReactClient(Provider);
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
