export type BuilderData = {
    rows: number;
    cols: number;
    matrix: number[][];
    cells: Map<number, number>;
    probabilities: number[];
    isBuilded: boolean | null;
    probsValid: boolean;
};
