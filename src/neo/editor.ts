import {HookRegister, HookRegisterConsumer} from "neo-hooks";
import {Value} from "./models/value";
import {groupBy, map, mergeMap, toArray} from "rxjs/operators";
import {from} from "rxjs";
import {NeoFunctionName, NeoFunctionParam, NeoFunctionProvider} from "./models/functions";
import {Path} from "./models/path";
import {GetNodeFunction} from "./functions/get-node";

export class Editor {
    hookRegister: HookRegister;
    value: Value;
    functionProviders: {[key: string]: Array<NeoFunctionProvider<any>>};
    constructor(value: Value, consumers?: Array<HookRegisterConsumer>) {
        this.value = value;
        this.hookRegister = new HookRegister();

        // listen query providers
        this.functionProviders = {};
        this.hookRegister.listen<NeoFunctionProvider<any>>(NeoFunctionName, hook => {
            let providers = this.hookRegister.getHooks<NeoFunctionProvider<any>>(NeoFunctionName);
            from(providers)
                .pipe(
                    groupBy(hook => hook.hook.name),
                    mergeMap(group => {
                        return [group.key, group.pipe(map(h => h.hook), toArray())] as [string, any];
                    }),
                    toArray(),
                )
                .subscribe(entries => {
                    this.functionProviders = Object.fromEntries(entries);
                })
        });

        if (consumers) {
            consumers.forEach(c => {
                c.init(this.hookRegister);
            })
        }
    }

    public run<T>(type: string, args?: Array<any>): T | any {
        const functions = this.functionProviders[type]
        if (!functions) {
            return;
        }

        const next = functions.reduceRight((n, func) => {
            return () => {
                func.run({
                    type,
                    args
                }, this, n);
            }
        }, () => null as any)

        return next();
    }

    // 发送事件
    public fireEvent(type: string, path: Path, args?: Array<any>) {
        let node = this.run<Node | null>(GetNodeFunction);
        let next = () => null as any;
        const currentPath = [path[0]];

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