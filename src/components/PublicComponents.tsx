import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function PublicComponentsList() {
  // Fetch all published components
  const publicComponents = useQuery(api.components.getPublicComponents);

  if (publicComponents === undefined) {
    return <div>Loading public components...</div>;
  }

  if (publicComponents.length === 0) {
    return <div>No public components available yet.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Public Components</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {publicComponents.map((comp) => (
          <div
            key={comp._id}
            className="border rounded-md p-4 shadow-sm bg-white"
          >
            <h3 className="font-semibold text-lg">{comp.name}</h3>
            <p className="text-sm text-gray-600">Language: {comp.language}</p>

            <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-x-auto">
              {comp.code}
            </pre>

            {comp.css && (
              <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-x-auto">
                {comp.css}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
