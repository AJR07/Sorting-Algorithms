import Element from "../types/element";
import shuffleArray from "./shufflearray";

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
