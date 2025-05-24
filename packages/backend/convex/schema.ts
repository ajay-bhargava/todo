import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const Todo = v.object({
	_id: v.id("todos"),
	_creationTime: v.number(),
	text: v.string(),
	completed: v.boolean(),
});

export default defineSchema({
	todos: defineTable(Todo).index("by_completed", ["completed"]),
});
