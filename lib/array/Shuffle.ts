export function Shuffle(array) {
    const arr = [...array];
    const len = arr.length - 1;
    for (let i = len; i > 0; i--) {
        const j = Math.floor(Math.random() * (len + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}