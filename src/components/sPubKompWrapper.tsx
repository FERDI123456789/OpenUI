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
      <div className="text-end max-w-7xl mx-auto pt-6">
        {/* SIGN UP OR CREATE POST FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 text-left px-6">
          <section className="w-full">
            <div className="rounded-lg w-full bg-gray-100 text-black ">
              <div className="skeleton h-96 w-full"></div>
            </div>
          </section>

          {/* POSTS */}
          <div className="flex flex-col space-y-5 w-full text-black">
            <div className="flex flex-col space-y-5 w-full text-black">
              <p className="text-gray-500 text-center space-y-5">
                <div className="skeleton h-64 "></div>
                <div className="skeleton h-64 "></div>
                <div className="skeleton h-64 "></div>
              </p>
            </div>
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
