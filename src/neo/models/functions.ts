import {Editor} from "../editor";

export interface NeoFunctionParam<T = any> {
    type: string,
    args: T,
}

export interface NeoFunction<T> {
    (params: NeoFunctionParam, editor: Editor, next: () => T | null): T | null;
}

export interface NeoFunctionProvider<IN = any, OUT = any> {
    name: string,

    run(param: NeoFunctionParam<IN>, editor: Editor, next: () => OUT): OUT;
}

export const NeoFunctionName = "query.provider";