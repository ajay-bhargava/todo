// apps/web/src/functions/useDebouncedCallback.ts
import { useRef, useCallback } from "react";
import { debounce } from "./debounce";

export function useDebouncedCallback<Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number,
): (...args: Args) => void {
	const fnRef = useRef(fn);
	fnRef.current = fn;

	// Only create the debounced function once
	const debounced = useRef(
		debounce((...args: Args) => fnRef.current(...args), delay),
	);

	return useCallback((...args: Args) => {
		debounced.current(...args);
	}, []);
}
