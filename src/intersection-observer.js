/**
 * A wrapper for `IntersectionObserver` that keeps track of the currently observed elements
 */
class IntersectionObserver {
	/** @type {IntersectionObserver} */
	#observer;

	/** @type {Array<Element>} */
	#elements;

	/**
	 *
	 * @param {IntersectionObserverCallback} callback
	 * @param {IntersectionObserverInit} init
	 */
	constructor(callback, init = {}) {
		this.#observer = new IntersectionObserver(callback, init);
		this.#elements = [];
	}

	/**
	 *
	 * @param {Element} element
	 */
	observe(element) {
		this.#observer.observe(element);
		this.#elements.push(element);
	}
	/**
	 *
	 * @param {Element} element
	 */
	unobserve(element) {
		this.#observer.unobserve(element);
		this.#elements = this.#elements.filter(
			(observed_element) => observed_element !== element,
		);
	}

	/**
	 * The currently observed elements
	 * @returns {Array<Element>}
	 */
	get elements() {
		return this.#elements;
	}
}

export { IntersectionObserver };
