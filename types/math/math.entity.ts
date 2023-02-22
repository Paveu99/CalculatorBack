export interface MathEntity {
    id?: string,
    firstNum: number,
    operator: string,
    secondNum: number,
    solution: number | null;
    dateAdded?: string | null,
}