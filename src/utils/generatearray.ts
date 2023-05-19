import Element from "../types/element";
import shuffleArray from "./shufflearray";

/**
 * Generates an array of elements with values from 0 to size - 1
 * and shuffles it.
 *
 * @export
 * @param {number} size
 * @returns {{}}
 */
export default function generateArray(size: number) {
    let arr: Element[] = [];
    for (let i = 0; i < size; i++) {
        arr.push({
            value: i,
            selected: false,
        });
    }

    arr = shuffleArray(arr);

    return arr;
}
