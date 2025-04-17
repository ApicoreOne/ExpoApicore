import { useEffect, useRef } from "react";

const useURLParamWatcher = (paramName, callback) => {
	const lastValueRef = useRef(null);

	useEffect(() => {
		const handleURLChange = () => {
			const url = new URL(window.location.href);
			const paramValue = url.searchParams.get(paramName);

			if (paramValue !== lastValueRef.current) {
				lastValueRef.current = paramValue;
				callback(paramValue);
			}
		};

		handleURLChange();

		const originalPushState = window.history.pushState;
		const originalReplaceState = window.history.replaceState;

		window.history.pushState = function (...args) {
			originalPushState.apply(this, args);
			handleURLChange();
		};

		window.history.replaceState = function (...args) {
			originalReplaceState.apply(this, args);
			handleURLChange();
		};

		window.addEventListener("popstate", handleURLChange);

		return () => {
			window.history.pushState = originalPushState;
			window.history.replaceState = originalReplaceState;
			window.removeEventListener("popstate", handleURLChange);
		};
	}, [paramName, callback]);
};

export default useURLParamWatcher;
