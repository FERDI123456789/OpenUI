import { useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import PublicComponentsList from "./Component"; // Remove unused App import if not needed

export default function PubKompWrapper({ id }: { id?: string }) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);

  useEffect(() => {
    const convex = new ConvexReactClient(import.meta.env.PUBLIC_CONVEX_URL);
    setClient(convex);
  }, []);

  console.log("PubKompWrapper received id:", id); // Debug log - remove in production

  if (!client)
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-800 rounded w-1/3"></div>
            <div className="h-96 bg-gray-800 rounded-xl"></div>
            <div className="h-64 bg-gray-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );

  if (!id) {
    return (
      <div className="p-6 text-red-500 text-center">
        No component ID provided in URL.
      </div>
    );
  }

  return (
    <ConvexProvider client={client}>
      <PublicComponentsList id={id} />
    </ConvexProvider>
  );
}
