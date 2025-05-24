import type { Id } from "@v5/backend/convex/_generated/dataModel.js";
import { Check, Trash2 } from "lucide-react";
import type { Todo } from "@v5/backend/convex/schema.js";

export default function TodoItem({
	todo,
	completed,
	editingText,
	onInputChange,
	onDelete,
	onMark,
}: {
	todo: typeof Todo.type;
	completed: boolean;
	editingText: string;
	onInputChange: (id: Id<"todos">, text: string) => void;
	onDelete: (id: Id<"todos">) => void;
	onMark: (id: Id<"todos">, completed: boolean) => void;
}) {
	return (
		<div
			key={todo._id}
			className="mx-auto flex w-full max-w-xs items-center justify-between gap-2 border-1 border-ring px-4 py-1"
		>
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<span
					className={`truncate ${completed ? "text-muted-foreground line-through" : ""}`}
				>
					<input
						type="text"
						value={editingText}
						onChange={(e) => onInputChange(todo._id, e.target.value)}
						className={`m-0 w-full border-none bg-transparent p-0 outline-none ${completed ? "text-muted-foreground line-through" : ""}`}
					/>
				</span>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onDelete(todo._id)}
					className="p-2 transition-colors hover:bg-destructive/10"
				>
					<Trash2 className="size-4 text-destructive" />
				</button>
				<button
					type="button"
					onClick={() => onMark(todo._id, !completed)}
					className="p-2 transition-colors hover:bg-primary/10"
				>
					<Check className="size-4 text-primary" />
				</button>
			</div>
		</div>
	);
}
