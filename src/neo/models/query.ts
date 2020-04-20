import {Editor} from "../editor";

export interface Query {
    type: string,
    args: Array<any>
}

export interface QueryFunc<T> {
    (query: Query, editor: Editor, next: () => T | null): T | null;
}