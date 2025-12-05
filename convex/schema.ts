import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(), // In production, this should be hashed
  }).index("by_username", ["username"]),
  component: defineTable({
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
    published: v.optional(v.boolean()),
    saveCount: v.optional(v.number()),
    copyCount: v.optional(v.number()),
  }).index("by_user", ["userId"]),
  saves: defineTable({
    userId: v.id("users"),
    componentId: v.id("component"),
    active: v.boolean(),
  })
    .index("by_user_component", ["userId", "componentId"])
    .index("by_user_active", ["userId", "active"]),
  copies: defineTable({
    userId: v.id("users"),
    componentId: v.id("component"),
    active: v.boolean(),
  })
    .index("by_user_component", ["userId", "componentId"])
    .index("by_user_active", ["userId", "active"]),
});
