import {AppCommand} from "../AppCommand";
import {AppStore, MathStore} from "../../AppStore";
import {Dispatch} from "redux";

export class UpdateMathCommand extends AppCommand {
    math: Partial<MathStore>;

    constructor(math: Partial<MathStore>) {
        super();
        this.math = math;
    }

    name(): string {
        return "Init/Strategy";
    }

    process(state: AppStore, dispatch: Dispatch<any>): AppStore {
        return {
            ...state,
            math: {
                ...state?.math,
                ...this.math,
            }
        }
    }
}