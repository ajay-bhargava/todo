"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/functions/debouncedCallback";
import { api } from "@v5/backend/convex/_generated/api.js";
import type { Id } from "@v5/backend/convex/_generated/dataModel.js";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import TodoItem from "@/components/todo/ToDoItem";

export default function ToDo() {
	const todos = useQuery(api.todo.getAllTodos);
	const createTodo = useMutation(api.todo.createTodo);
	const deleteTodo = useMutation(api.todo.deleteTodo);
	const updateTodo = useMutation(api.todo.updateTodo);
	const markTodo = useMutation(api.todo.markTodo);

	const [editingTexts, setEditingTexts] = useState<Record<string, string>>({});
	const [optimisticCompleted, setOptimisticCompleted] = useState<
		Record<string, boolean>
	>({});
	const [newTodoText, setNewTodoText] = useState("");

	// Debounced callbacks for mutations
	const debouncedUpdateTodo = useDebouncedCallback(
		(id: Id<"todos">, text: string) => {
			updateTodo({ id, text });
		},
		500,
	);

	const debouncedCreateTodo = useDebouncedCallback((text: string) => {
		createTodo({ text });
	}, 100);

	const debouncedMarkTodo = useDebouncedCallback(
		(id: Id<"todos">, completed: boolean) => {
			markTodo({ id, completed });
		},
		500,
	);

	// Handlers for the UI
	const handleInputChange = (id: Id<"todos">, text: string) => {
		setEditingTexts((prev) => ({ ...prev, [id]: text }));
		debouncedUpdateTodo(id, text);
	};

	const handleCreateTodo = () => {
		if (newTodoText.trim() === "") return;
		debouncedCreateTodo(newTodoText.trim());
		setNewTodoText("");
	};

	const handleMarkTodo = (id: Id<"todos">, completed: boolean) => {
		setOptimisticCompleted((prev) => ({ ...prev, [id]: completed }));
		debouncedMarkTodo(id, completed);
	};

	// This effect synchronizes the local editing state with the server state whenever todos change.
	// It creates a new mapping of todo IDs to their current text values and resets any optimistic
	// completion states. This ensures the UI stays in sync with the backend data.
	useEffect(() => {
		if (todos) {
			const newEditingTexts: Record<string, string> = {};
			for (const todo of todos) {
				newEditingTexts[todo._id] = todo.text;
			}
			setEditingTexts(newEditingTexts);
			setOptimisticCompleted({});
		}
	}, [todos]);

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Card className="w-full max-w-sm bg-slate-50 dark:bg-slate-900">
				<CardHeader className="flex flex-row items-center justify-between gap-2">
					<CardTitle>To Do List</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex w-full flex-col gap-4">
						{todos?.map((todo) => (
							<TodoItem
								key={todo._id}
								todo={todo}
								completed={optimisticCompleted[todo._id] ?? todo.completed}
								editingText={editingTexts[todo._id] ?? todo.text}
								onInputChange={handleInputChange}
								onDelete={(id: Id<"todos">) => deleteTodo({ id })}
								onMark={handleMarkTodo}
							/>
						))}
						<div className="mx-auto flex w-full max-w-xs items-center gap-2">
							<Input
								placeholder="Add a new todo..."
								value={newTodoText}
								onChange={(e) => setNewTodoText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") handleCreateTodo();
								}}
								className="flex-1 rounded-none"
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
