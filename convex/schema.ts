import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(), // In production, this should be hashed
  }).index("by_username", ["username"]),
  component: defineTable({
    name: v.string(),
    language: v.union(v.literal("html"), v.literal("jsx"), v.literal("vue"), v.literal("astro")),
    css: v.optional(v.string()),
    code: v.string(),
    userId: v.id("users"),
    saved: v.optional(v.boolean()),
    published: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),
});
