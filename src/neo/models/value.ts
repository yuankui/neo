import {Node} from "./node";
import {Selection} from "./selection";

export interface Value {
    value: Node,
    selection: Selection,
}