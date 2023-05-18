import Element from "../types/element";
import shuffleArray from "./shufflearray";

export default function generateArray(min: number, max: number, size: number) {
    let arr: Element[] = [];
    for (let i = 0; i < size; i++) {
        arr.push({
            value: min + ((max - min) / size) * i,
            selected: false,
        });
    }

    arr = shuffleArray(arr);

    return arr;
}
