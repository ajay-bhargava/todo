/**
 * Creates a debounced version of a function that delays its execution until after
 * a specified delay has passed since the last time it was called.
 *
 * @template Args - The argument types of the function to debounce
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds to wait before executing the function
 * @returns A new function that will only execute after the specified delay has passed
 *          since its last invocation
 *
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   // Perform search with query
 * }, 300);
 *
 * // Only the last call within 300ms will execute
 * debouncedSearch("a");
 * debouncedSearch("ap");
 * debouncedSearch("app"); // Only this call will execute
 */
export function debounce<Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number,
): (...args: Args) => void {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn(...args), delay);
	};
}
