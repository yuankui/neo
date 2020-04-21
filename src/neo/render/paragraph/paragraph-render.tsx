import {NeoNodeRender} from "../node-render";
import * as React from "react";

export const paragraphRender: NeoNodeRender = {
    name: 'paragraph',
    render: (editor, node, attr, next) => {
        return <p>
            {attr.children}
        </p>
    },
    onEvent: (editor, type, node, args, next) => {
        
    }
}