import {HookRegister, HookRegisterConsumer} from "neo-hooks";
import {Value} from "./models/value";
import {groupBy, map, mergeMap, toArray} from "rxjs/operators";
import {from} from "rxjs";
import {NeoFunctionName, NeoFunctionParam, NeoFunctionProvider} from "./models/functions";
import {Path} from "./models/path";
import {GetNodeFunction} from "./functions/get-node";
import {NeoNodeRender, NeoNodeRenderHookName} from "./render/node-render";
import {Node} from "./models/node";

export class Editor {
    hookRegister: HookRegister;
    value: Value;
    functionProviders: {[key: string]: Array<NeoFunctionProvider<any>>};
    nodeRenders: {[key: string]: Array<NeoNodeRender>};
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
                        return group.pipe(
                            map(h => h.hook),
                            toArray(),
                            map(arr => [group.key, arr]),
                        );
                    }),
                    toArray(),
                )
                .subscribe(entries => {
                    this.functionProviders = Object.fromEntries(entries);
                })
        });

        // listen node-renders
        this.nodeRenders = {};
        this.hookRegister.listen<NeoNodeRender>(NeoNodeRenderHookName, hook => {
            let renders = this.hookRegister.getHooks<NeoNodeRender>(NeoNodeRenderHookName);
            from(renders)
                .pipe(
                    groupBy(hook=> hook.hook.name),
                    mergeMap(group=> {
                        return group.pipe(
                            map(h => h.hook),
                            toArray(),
                            map(arr => [group.key, arr]),
                        );
                    })
                )
                .subscribe(entries => {
                    this.nodeRenders = Object.fromEntries(entries as any);
                })
        })

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
    public fireEvent(type: string, path: Path, args: any) {
        const tmpPath = [...path];
        let done = false;

        // 从最底层node开始
        while (tmpPath.length != 0) {
            let node = this.run<Node | null>(GetNodeFunction, [tmpPath]);
            let renders = this.nodeRenders[node.type];

            // 遍历所有可能的渲染器
            for (let render of renders) {
                render.onEvent(type, node, args || [], () => {
                    done = true;
                })

                if (done) {
                    return;
                }
            }
            tmpPath.pop();
        }
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