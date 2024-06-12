import { IntersectionObserver } from "./intersection-observer.js";

/**
 * Observe an element
 * @param {(() => Element | null) | Element} element_or_getter
 * @param {IntersectionObserverInit} init
 */
function use_intersect(element_or_getter, init = {}) {
	const element = $derived(
		typeof element_or_getter === "function"
			? element_or_getter()
			: element_or_getter,
	);

	/** @type {IntersectionObserverCallback} */
	const callback = (entries) => {
		for (const entry of entries) {
			console.log(entry.isIntersecting);
		}
	};

	const observer = create_or_get_observer(callback, init);

	$effect(() => {
		if (!element) {
			return;
		}
		observer.observe(element);
		return () => {
			observer.unobserve(element);
			if (observer.elements.length === 0) {
				remove_observer(init);
			}
		};
	});

	return {};
}

/** @type {Map<string, IntersectionObserver>} */
const observers = new Map();

/**
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverInit} init
 * @returns {IntersectionObserver}
 */
function create_or_get_observer(callback, init = {}) {
	const stringified_init = JSON.stringify(init);
	const existing_observer = observers.get(stringified_init);
	if (existing_observer != null) {
		return existing_observer;
	}
	const observer = new IntersectionObserver(callback, init);
	observers.set(stringified_init, observer);
	return observer;
}

/**
 * @param {IntersectionObserverInit} init
 * @returns {void}
 */
function remove_observer(init = {}) {
	const stringified_init = JSON.stringify(init);
	observers.delete(stringified_init);
}

export { use_intersect as useIntersect };
