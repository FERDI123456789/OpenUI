import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import DashboardLayout from "./DashboardLayout";
import ComponentsView from "./ComponentsView";
import CreateComponentPage from "./CreateComponentPage";

export default function App({ profileId }: { profileId?: string }) {
  const [userId, setUserId] = React.useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("userId") : null
  );
  const isOwnProfile = profileId === userId || !profileId;
  const queryUserId = profileId || userId;

  const [username, setUsername] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState<
    "components" | "saved" | "published" | "discover"
  >("components");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedComponent, setSelectedComponent] = React.useState<any>(null);
  const [showCreatePage, setShowCreatePage] = React.useState(false);
  const [newComponent, setNewComponent] = React.useState({
    name: "",
    description: "",
    language: "html",
    css: "",
    code: "<div class='p-6 text-center'>Start building your component...</div>",
    javascript: "",
  });

  const createComponent = useMutation(api.components.createComponent);
  const saveComponent = useMutation(api.components.saveComponent);
  const publishComponent = useMutation(api.components.publishComponent);
  const unpublishComponent = useMutation(api.components.unpublishComponent);

  const allComponents = useQuery(
    api.components.getComponents,
    queryUserId ? { userId: queryUserId as any } : "skip"
  );
  const savedComponents = useQuery(
    api.components.getSavedComponents,
    queryUserId ? { userId: queryUserId as any } : "skip"
  );
  const publishedComponents = useQuery(
    api.components.getPublishedComponents,
    queryUserId ? { userId: queryUserId as any } : "skip"
  );
  const allPublicComponents = useQuery(api.components.getPublicComponents);
  const profileUser = useQuery(
    api.components.getUserById,
    profileId ? { id: profileId as any } : "skip"
  );

  const getCurrentComponents = () => {
    if (!isOwnProfile) return publishedComponents;
    if (currentPage === "saved") return savedComponents;
    if (currentPage === "published") return publishedComponents;
    if (currentPage === "discover") return allPublicComponents;
    return allComponents;
  };

  const components = getCurrentComponents();
  const filteredComponents = React.useMemo(() => {
    if (!components || !searchQuery) return components || [];
    return components.filter((comp: any) =>
      comp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [components, searchQuery]);

  const getLanguageBadgeColor = (lang: string) => {
    switch (lang) {
      case "html":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "css":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "javascript":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleTogglePublish = async (componentId: string) => {
    if (!selectedComponent || selectedComponent._id !== componentId) return;

    const newPublished = !selectedComponent.published;
    setSelectedComponent({ ...selectedComponent, published: newPublished });

    try {
      if (newPublished) {
        await publishComponent({ componentId: componentId as any });
      } else {
        await unpublishComponent({ componentId: componentId as any });
      }
    } catch (err) {
      console.error("Toggle failed, reverting...", err);
      setSelectedComponent((prev: any) =>
        prev?._id === componentId
          ? { ...prev, published: !prev.published }
          : prev
      );
    }
  };

  const handleCreateSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!userId) return;

    // Combine CSS and JavaScript into CSS field if both exist
    let combinedCss = newComponent.css || "";
    if (newComponent.javascript) {
      combinedCss = combinedCss 
        ? `${combinedCss}\n\n<script>\n${newComponent.javascript}\n</script>`
        : `<script>\n${newComponent.javascript}\n</script>`;
    }

    createComponent({
      name: newComponent.name,
      description: newComponent.description || undefined,
      language: newComponent.language as "html" | "css" | "javascript",
      css: combinedCss || undefined,
      code: newComponent.code,
      userId: userId as any,
    });

    setShowCreatePage(false);
    setNewComponent({
      name: "",
      description: "",
      language: "html",
      css: "",
      code: "<div class='p-6 text-center'>Start building your component...</div>",
      javascript: "",
    });
  };

  const handleNewComponentChange = (
    field: "name" | "description" | "language" | "css" | "code" | "javascript",
    value: string
  ) => setNewComponent((prev) => ({ ...prev, [field]: value }));

  const canTogglePublish = isOwnProfile && currentPage !== "saved";

  return (
    <>
      <DashboardLayout
        username={username}
        profileUsername={profileUser?.username}
        isOwnProfile={isOwnProfile}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={() => {
          if (typeof window !== "undefined") {
            localStorage.clear();
            setUserId(null);
            setUsername("");
            requestAnimationFrame(() => (window.location.href = "/"));
          }
        }}
        topRightExtra={null}
      >
        <ComponentsView
          components={components}
          filteredComponents={filteredComponents}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          {...(isOwnProfile && {
            onCreateClick: () => {
              setShowCreatePage(true);
              setNewComponent({
                name: "",
                description: "",
                language: "html",
                css: "",
                code: "<div class='p-6 text-center'>Start building your component...</div>",
                javascript: "",
              });
            },
          })}
          onSelectComponent={(c) => setSelectedComponent(c)}
          getLanguageBadgeColor={getLanguageBadgeColor}
          currentPage={currentPage}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          handleTogglePublish={
            canTogglePublish ? handleTogglePublish : undefined
          }
        />

        {showCreatePage && (
          <CreateComponentPage
            newComponent={newComponent}
            onChange={handleNewComponentChange}
            onSubmit={handleCreateSubmit}
            onCancel={() => setShowCreatePage(false)}
            getLanguageBadgeColor={getLanguageBadgeColor}
          />
        )}
      </DashboardLayout>
    </>
  );
}
