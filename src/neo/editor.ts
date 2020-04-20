import {HookRegister, HookRegisterConsumer} from "neo-hooks";
import {Value} from "./models/value";
import {Command, CommandFunc} from "./models/command";
import {Query, QueryFunc} from "./models/query";

export class Editor {
    hookRegister: HookRegister;
    value: Value;
    constructor(value: Value, consumers?: Array<HookRegisterConsumer>) {
        this.value = value;
        this.hookRegister = new HookRegister();

        if (consumers) {
            consumers.forEach(c => {
                c.init(this.hookRegister);
            })
        }
    }

    public command(command: Command): void {
        let hooks = this.hookRegister.getHooks<CommandFunc>('command');
        const next = hooks.reduceRight((func, hook) => {
            return () => {
                hook.hook(command, this, func);
            }
        }, () => {})

        return next();
    }

    public query<T>(query: Query): T {
        let hooks = this.hookRegister.getHooks<QueryFunc<T>>('query');
        const next = hooks.reduceRight((func, hook) => {
            return () => {
                hook.hook(query, this, func);
            }
        }, () => null as any)

        return next();
    }

    public setValue(value: Value) {
        // update value
        this.value = value;

        // notify listener
        let hooks = this.hookRegister.getHooks<ValueListener>('value.listener');
        const next = hooks.reduceRight((func, hook) => {
            return () => {
                hook.hook(value, this, func);
            }
        }, () => {})

        return next();
    }
}

export interface ValueListener {
    (v: Value, editor: Editor, next: ()=> void): void,
}