import {Editor} from "../editor";

export interface NeoFunctionParam {
    type: string,
    args?: Array<any>
}

export interface NeoFunction<T> {
    (params: NeoFunctionParam, editor: Editor, next: () => T | null): T | null;
}

export interface NeoFunctionProvider<T> {
    name: string,
    run(param: NeoFunctionParam, editor: Editor, next: () => T): T;
}

export const NeoFunctionName = "query.provider";