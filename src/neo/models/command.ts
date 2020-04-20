import {Editor} from "../editor";

export interface Command {
    type: string,
    args: Array<any>,
}

export interface CommandFunc {
    (command: Command, editor: Editor, next: () => void): void;
}