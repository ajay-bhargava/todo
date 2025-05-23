"use client";

import { env } from "@/env";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

export default function Providers({ children }: { children: React.ReactNode }) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
