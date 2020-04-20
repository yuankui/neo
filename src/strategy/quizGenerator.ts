import {Strategy} from "./Strategy";
import {Quiz} from "../app/math1/MathApp";

const randomInt = (max: number, min: number = 0) => {
    return parseInt(String(Math.random() * (max - min))) + min;
};

export function generateQuiz(strategy: Strategy): Quiz {

    for (let i = 0; i < 1000; i++) {
        let first = randomInt(strategy.max, 1);
        let second = randomInt(strategy.max, 1);

        // 检查最大值
        if (first + second > strategy.max) {
            continue;
        }

        // 检查进位
        if (strategy.levelUp && first % 10 + second % 10 < 10) {
            continue;
        }

        // 加减法
        const operator: any = strategy.operator === undefined ? ["+", "-"][randomInt(100) % 2] : strategy.operator;
        let row: any = [first, second, first + second];
        if (operator === '-') {
            const [a, b, c] = row;
            row = [c, b, a];
        }

        let spacePosition = strategy.space === undefined ? randomInt(3) : strategy.space;

        row[spacePosition] = null;

        return {
            num1: row[0],
            num2: row[1],
            num3: row[2],
            operator: operator,
        };
    }

    throw new Error("数值范围不对，生成失败");
}