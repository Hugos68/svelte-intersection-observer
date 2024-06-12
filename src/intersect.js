/**
 *
 * @param {(() => Element) | Element} element_or_element_getter
 * @param {*} options
 */
function useIntersect(element_or_getter, options = {}) {
	const element = $derived(
		typeof element_or_getter === "function"
			? element_or_getter()
			: element_or_getter,
	);

    const {

    } = $derived(options);


    const intersecting = $state(false);

    return {

    }
}
