import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Todo } from "./schema";

// Query: Get all todos
export const getAllTodos = query({
	args: {},
	returns: v.array(Todo),
	handler: async (ctx) => {
		return await ctx.db.query("todos").order("desc").collect();
	},
});

// Mutation: Create a new todo
export const createTodo = mutation({
	args: {
		text: v.string(),
	},
	returns: v.id("todos"),
	handler: async (ctx, args) => {
		return await ctx.db.insert("todos", { text: args.text, completed: false });
	},
});

// Mutation: Delete a todo by id
export const deleteTodo = mutation({
	args: {
		id: v.id("todos"),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
		return null;
	},
});

// Mutation: Mark a todo by Id
export const markTodo = mutation({
	args: {
		id: v.id("todos"),
		completed: v.boolean(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { completed: args.completed });
		return null;
	},
});

// Mutation: Update a todo's text by id
export const updateTodo = mutation({
	args: {
		id: v.id("todos"),
		text: v.string(),
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { text: args.text });
		return null;
	},
});
