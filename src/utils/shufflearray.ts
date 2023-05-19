/**
 * Shuffle an array - Randomly!
 *
 * @export
 * @param {any[]} arr
 * @returns {{}}
 */
export default function shuffleArray(arr: any[]) {
    let newArr = [...arr];

    for (let i = newArr.length - 1; i > 0; i--) {
        // by grabbing a random element and swapping it with he current one
        const j = Math.floor(Math.random() * i);
        const temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}
