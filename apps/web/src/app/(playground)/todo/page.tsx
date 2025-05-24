"use client";

import { api } from "@v5/backend/convex/_generated/api.js";
import { useMutation, useQuery } from "convex/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import type { Id } from "@v5/backend/convex/_generated/dataModel.js";
import { useDebouncedCallback } from "@/functions/debouncedCallback";
import { useRef, useState, useEffect } from "react";

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
		<div className="flex w-full flex-col items-center">
			<Card className="mx-auto w-full max-w-sm">
				<CardHeader>
					<CardTitle>To Do List</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex w-full flex-col gap-4">
						{todos?.map((todo) => {
							const completed = optimisticCompleted[todo._id] ?? todo.completed;
							return (
								<div
									key={todo._id}
									className="mx-auto flex w-full max-w-xs items-center justify-between gap-4 bg-muted px-4 py-3 shadow-sm"
								>
									<div className="flex min-w-0 flex-1 items-center gap-3">
										<span
											className={`truncate ${completed ? "text-muted-foreground line-through" : ""}`}
										>
											<input
												type="text"
												value={editingTexts[todo._id] ?? todo.text}
												onChange={(e) =>
													handleInputChange(todo._id, e.target.value)
												}
												className={`m-0 w-full border-none bg-transparent p-0 outline-none ${completed ? "text-muted-foreground line-through" : ""}`}
											/>
										</span>
									</div>
									<div className="flex items-center gap-2">
										<button
											type="button"
											onClick={() => deleteTodo({ id: todo._id })}
											className="p-2 transition-colors hover:bg-destructive/10"
										>
											<Trash2 className="size-4 text-destructive" />
										</button>
										<button
											type="button"
											onClick={() => handleMarkTodo(todo._id, !completed)}
											className="p-2 transition-colors hover:bg-primary/10"
										>
											<Check className="size-4 text-primary" />
										</button>
									</div>
								</div>
							);
						})}
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
							<Button
								variant="outline"
								className="rounded-none"
								onClick={handleCreateTodo}
							>
								Add
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
