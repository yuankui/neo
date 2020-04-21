import {Node} from "../models/node";
import {Editor} from "../editor";

export interface NodeEventNotify {
    /**
     * @return true event is handled
     * @return false event is not handled
     */
    (editor: Editor, node: Node, type: string, param?: any): boolean,
}

export const nodeEventNotifyName = "neo.node.event.notify";