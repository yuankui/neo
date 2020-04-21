import {Editor} from "../editor";
import {Node} from "../models/node";
import {Next} from "../next";

export interface NeoNodeRender {
    name: string,
    render: (editor: Editor, node: Node, attr: NeoNodeRenderAttributes, next: Next) => any,
    onEvent: (type: string, args: Array<any>, next: Next) => void,
}

export interface NeoNodeRenderAttributes {
    children: any,
    readonly: boolean,
}