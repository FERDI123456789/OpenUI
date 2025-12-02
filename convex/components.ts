import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createComponent = mutation({
  args: {
    name: v.string(),
    language: v.union(v.literal("html"), v.literal("jsx"), v.literal("vue"), v.literal("astro")),
    css: v.optional(v.string()),
    code: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, {name, language, css, code, userId}) => {
    const component = await ctx.db.insert("component", {
      name,
      language,
      css,
      code,
      userId,
    });
    return component;
  }
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
  }
});

export const getSavedComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (userId) {
      return await ctx.db
        .query("component")
        .filter((q) => q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("saved"), true)
        ))
        .collect();
    }
    return [];
  }
});

export const getPublishedComponents = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (userId) {
      return await ctx.db
        .query("component")
        .filter((q) => q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("published"), true)
        ))
        .collect();
    }
    return [];
  }
});

export const saveComponent = mutation({
  args: {
    componentId: v.id("component"),
  },
  handler: async (ctx, { componentId }) => {
    const component = await ctx.db.get(componentId);
    if (!component) {
      throw new Error("Component not found");
    }
    await ctx.db.patch(componentId, { saved: true });
    return { success: true };
  }
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
  }
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
  }
});
