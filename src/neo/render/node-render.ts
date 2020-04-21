import {Editor} from "../editor";
import {Node} from "../models/node";
import {Next} from "../next";

export interface NeoNodeRender {
    name: string,
    render: (editor: Editor, node: Node, attr: NeoNodeRenderAttributes, next: Next) => any,
    onEvent: (type: string, node: Node, args: any, next: Next) => void,
}

export interface NeoNodeRenderAttributes {
    children: any,
    readonly: boolean,
}

export const NeoNodeRenderHookName = 'neo.node.render';