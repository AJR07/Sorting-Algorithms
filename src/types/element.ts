/**
 * Element Object - used to represent a single element in the array of elements to be sorted
 *
 * @export
 * @interface Element
 * @typedef {Element}
 */
export default interface Element {
    /**
     * Value of the element, or the height of the bar
     *
     * @type {number}
     */
    value: number;
    /**
     * Whether the element is selected or not (whether its red or not)
     *
     * @type {boolean}
     */
    selected: boolean;
}
