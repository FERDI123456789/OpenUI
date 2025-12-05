import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const signup = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    // Check if username already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .first();

    if (existingUser) {
      throw new Error("Username already exists"); // Clean message
    }
    // Create new user
    const userId = await ctx.db.insert("users", {
      username,
      password, // In production, hash this password
    });

    return { userId, username };
  },
});

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), username))
      .first();

    // Return a readable error instead of raw server error
    if (!user || user.password !== password) {
      // Throwing a normal Error is okay; on client we’ll read error.message
      throw new Error("Invalid username or password");
    }

    return { userId: user._id, username: user.username };
  },
});

export const getCurrentUser = query({
  args: {
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, { userId }) => {
    if (!userId) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});
