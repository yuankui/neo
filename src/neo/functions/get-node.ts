import {Node} from "../models/node";
import {Editor} from "../editor";
import {NeoFunctionParam, NeoFunctionProvider} from "../models/functions";

export const GetNodeFunction = "get.node";

export const getNode : NeoFunctionProvider<Node | null> = {
    name: GetNodeFunction,
    run(query: NeoFunctionParam, editor: Editor, next: () => Node): Node | null{
        const value = editor.value;
        let focus = value.selection?.focus;
        if (!focus) {
            return null;
        }

        const path = focus.path;
        if (path.length <= 0) {
            // empty path
            return null;
        }

        let node = value.nodes[path[0]];
        for (let i = 1; i < path.length; i++) {
            if (!node.children) {
                return null;
            }
            node = node.children[path[i]]
        }
        return node;
    }
}