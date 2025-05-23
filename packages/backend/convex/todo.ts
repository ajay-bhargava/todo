import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query: Get all todos
export const getAllTodos = query({
	args: {},
	handler: async (ctx) => {
		return await ctx.db.query("todos").collect();
	},
});

// Mutation: Create a new todo
export const createTodo = mutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("todos", { text: args.text, completed: false });
	},
});

// Mutation: Delete a todo by id
export const deleteTodo = mutation({
	args: {
		id: v.id("todos"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
		return null;
	},
});

// Mutation: Mark a todo as completed by id
export const markTodoCompleted = mutation({
	args: {
		id: v.id("todos"),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { completed: true });
		return null;
	},
});
