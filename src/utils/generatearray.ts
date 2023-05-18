import Element from "../types/element";

export default function generateRandomArray(
    min: number,
    max: number,
    size: number
) {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push({
            value: Math.floor(Math.random() * (max - min + 1)) + min,
            selected: false,
        } as Element);
    }
    return randomArray;
}
