"use client";
import { api } from "@v5/backend/convex/_generated/api.js";
import { useQuery } from "convex/react";

export default function Home() {
	const healthCheck = useQuery(api.healthCheck.get);

	return (
		<div className="container mx-auto max-w-3xl px-4 py-2">
			<h1>Hello World</h1>
			<p>{healthCheck}</p>
		</div>
	);
}
