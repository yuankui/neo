import {AppCommand} from "../AppCommand";
import {AppStore} from "../../AppStore";
import {Dispatch} from "redux";
import {UpdateMathCommand} from "./UpdateMathCommand";
import {Strategy} from "../../../strategy/Strategy";

export class UpdateStrategyCommand extends AppCommand {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        super();
        this.strategy = strategy;
    }

    name(): string {
        return "Init/Strategy";
    }

    async process(state: AppStore, dispatch: Dispatch<any>): Promise<any> {
        dispatch(new UpdateMathCommand({
            strategy: this.strategy,
        }));
    }
}