export interface Strategy {
    max: number,

    operator?: "+" | "-";
    levelUp?: boolean,

    space?: 0 | 1 | 2,

    quizLine: number,
}
