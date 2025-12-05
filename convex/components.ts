import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createComponent = mutation({
  args: {
    name: v.string(),
    language: v.union(
      v.literal("html"),
      v.literal("jsx"),
      v.literal("vue"),
      v.literal("astro")
    ),
    css: v.optional(v.string()),
    code: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { name, language, css, code, userId }) => {
    const component = await ctx.db.insert("component", {
      name,
      language,
      css,
      code,
      userId,
      saveCount: 0,
      copyCount: 0,
    });
    return component;
  },
});

export const getComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (userId) {
      return await ctx.db
        .query("component")
        .filter((q) => q.eq(q.field("userId"), userId))
        .collect();
    }
    return [];
  },
});

export const getPublicComponents = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("component")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getSavedComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    const saves = await ctx.db
      .query("saves")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", userId).eq("active", true)
      )
      .collect();
    const components = await Promise.all(
      saves.map((s) => ctx.db.get(s.componentId))
    );
    return components.filter((c): c is NonNullable<typeof c> => c !== null);
  },
});

export const getCopiedComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (!userId) return [];
    const copies = await ctx.db
      .query("copies")
      .withIndex("by_user_active", (q) =>
        q.eq("userId", userId).eq("active", true)
      )
      .collect();
    const components = await Promise.all(
      copies.map((c) => ctx.db.get(c.componentId))
    );
    return components.filter((c): c is NonNullable<typeof c> => c !== null);
  },
});

export const getComponentById = query({
  args: {
    id: v.id("component"),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { id, userId }) => {
    const comp = await ctx.db.get(id);
    if (!comp) return null;
    if (comp.published || (userId && comp.userId === userId)) {
      return comp;
    }
    return null;
  },
});

export const getPublicComponentById = query({
  args: {
    id: v.id("component"),
  },
  handler: async (ctx, { id }) => {
    const comp = await ctx.db.get(id);
    if (!comp || comp.published !== true) return null;
    return comp;
  },
});

export const getUserById = query({
  args: {
    id: v.id("users"), // Fix: Change "user" to "users"
  },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id); // Optional: Rename variable for clarity
    return user;
  },
});

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (!user) return null;
    return { username: user.username /* add other public fields */ };
  },
});

export const getPublishedComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (userId) {
      return await ctx.db
        .query("component")
        .filter((q) =>
          q.and(
            q.eq(q.field("userId"), userId),
            q.eq(q.field("published"), true)
          )
        )
        .collect();
    }
    return [];
  },
});

export const isSaved = query({
  args: {
    componentId: v.id("component"),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { componentId, userId }) => {
    if (!userId) return false;
    const existing = await ctx.db
      .query("saves")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    return !!existing && existing.active;
  },
});

export const isCopied = query({
  args: {
    componentId: v.id("component"),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { componentId, userId }) => {
    if (!userId) return false;
    const existing = await ctx.db
      .query("copies")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    return !!existing && existing.active;
  },
});

export const saveComponent = mutation({
  args: {
    componentId: v.id("component"),
    userId: v.id("users"),
  },
  handler: async (ctx, { componentId, userId }) => {
    const component = await ctx.db.get(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    if (component.userId === userId) {
      throw new Error("Cannot save your own component");
    }
    const existing = await ctx.db
      .query("saves")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    let incremented = false;
    if (!existing) {
      await ctx.db.insert("saves", {
        userId,
        componentId,
        active: true,
      });
      incremented = true;
    } else if (!existing.active) {
      await ctx.db.patch(existing._id, { active: true });
    }
    // If incremented, update the count
    if (incremented) {
      await ctx.db.patch(componentId, {
        saveCount: (component.saveCount || 0) + 1,
      });
    }
    return { success: true };
  },
});

export const copyComponent = mutation({
  args: {
    componentId: v.id("component"),
    userId: v.id("users"),
  },
  handler: async (ctx, { componentId, userId }) => {
    const component = await ctx.db.get(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    const existing = await ctx.db
      .query("copies")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    let incremented = false;
    if (!existing) {
      await ctx.db.insert("copies", {
        userId,
        componentId,
        active: true,
      });
      incremented = true;
    } else if (!existing.active) {
      await ctx.db.patch(existing._id, { active: true });
    }
    // If incremented, update the count
    if (incremented) {
      await ctx.db.patch(componentId, {
        copyCount: (component.copyCount || 0) + 1,
      });
    }
    return { success: true };
  },
});

export const unsaveComponent = mutation({
  args: {
    componentId: v.id("component"),
    userId: v.id("users"),
  },
  handler: async (ctx, { componentId, userId }) => {
    const existing = await ctx.db
      .query("saves")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    if (existing && existing.active) {
      await ctx.db.patch(existing._id, { active: false });
    }
    return { success: true };
  },
});

export const uncopyComponent = mutation({
  args: {
    componentId: v.id("component"),
    userId: v.id("users"),
  },
  handler: async (ctx, { componentId, userId }) => {
    const existing = await ctx.db
      .query("copies")
      .withIndex("by_user_component", (q) =>
        q.eq("userId", userId).eq("componentId", componentId)
      )
      .first();
    if (existing && existing.active) {
      await ctx.db.patch(existing._id, { active: false });
    }
    return { success: true };
  },
});

export const publishComponent = mutation({
  args: {
    componentId: v.id("component"),
  },
  handler: async (ctx, { componentId }) => {
    const component = await ctx.db.get(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    await ctx.db.patch(componentId, { published: true });
    return { success: true };
  },
});

export const unpublishComponent = mutation({
  args: {
    componentId: v.id("component"),
  },
  handler: async (ctx, { componentId }) => {
    const component = await ctx.db.get(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    await ctx.db.patch(componentId, { published: false });
    return { success: true };
  },
});
