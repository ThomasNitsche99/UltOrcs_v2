
const fisherYatesAlgorithm = <T>(arr: T[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}


export const shuffleArr = <T>(arr: T[]) => {
    fisherYatesAlgorithm(arr)
}