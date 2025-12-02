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
      throw new Error("Username already exists");
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

    if (!user) {
      throw new Error("Invalid username or password");
    }

    // In production, compare hashed passwords
    if (user.password !== password) {
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

