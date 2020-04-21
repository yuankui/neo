import {HookRegister, HookRegisterConsumer} from "neo-hooks";
import {getNode} from "./get-node";
import {NeoFunctionName, NeoFunctionProvider} from "../models/functions";

export function registerQueryProvider(): HookRegisterConsumer {
    return {
        init(hookRegister: HookRegister): void {
            const registerQuery = (query: NeoFunctionProvider<any>) => {
                hookRegister.register<NeoFunctionProvider<any>>({
                    name: NeoFunctionName,
                    hook: query,
                });
            }

            registerQuery(getNode);
        }
    }
}