import React from "react";

export const dateFormat = (date: Date) => {
	const MM = String(date.getMonth() + 1).padStart(2, "0");
	const YYYY = String(date.getFullYear()).padStart(4, "0");

	return `${MM}-${YYYY}`;
};

/**
 * That's a copy of debounce from internet
 */

export const useDebounce = (value, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = React.useState("");
	const timerRef = React.useRef(undefined);

	React.useEffect(() => {
		timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

		return () => {
			clearTimeout(timerRef.current);
		};
	}, [value, delay]);

	return debouncedValue;
};
