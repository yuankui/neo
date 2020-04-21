import {Supporter} from "./supporter";
import {Editor} from "../editor";
import {Node} from "../models/node";

export interface SetBlockSupporter extends Supporter {
}

interface SetBlockSupport {
    setBlock(editor: Editor, old: Node, newNode: Node): void,
}