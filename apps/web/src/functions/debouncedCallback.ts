// apps/web/src/functions/useDebouncedCallback.ts
import { useCallback, useRef } from "react";
import { debounce } from "./debounce";

/**
 * A React hook that creates a debounced version of a callback function.
 * The debounced function will only execute after the specified delay has passed
 * since its last invocation.
 *
 * @template Args - The argument types of the callback function
 * @param fn - The callback function to debounce
 * @param delay - The delay in milliseconds to wait before executing the function
 * @returns A memoized debounced version of the callback function
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((query: string) => {
 *   // Perform search with query
 * }, 300);
 *
 * // Only the last call within 300ms will execute
 * debouncedSearch("a");
 * debouncedSearch("ap");
 * debouncedSearch("app"); // Only this call will execute
 */
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
