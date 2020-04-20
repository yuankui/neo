import {AppCommand} from "./AppCommand";
import {AppStore} from "../AppStore";
import {Dispatch} from "redux";
import {UpdateMathCommand} from "./math/UpdateMathCommand";

export class InitCommand extends AppCommand {
    name(): string {
        return "InitApp";
    }

    async process(state: AppStore, dispatch: Dispatch): Promise<any> {
        dispatch(new UpdateMathCommand({
            strategy: {
                levelUp: true,
                space: 2,
                operator: "+",
                max: 100,
                quizLine: 10,
            },
        }));
    }

}