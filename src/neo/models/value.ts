import {Node} from "./node";
import {Selection} from "./selection";

export interface Value {
    nodes: Array<Node>,
    selection?: Selection,
}

export function emptyValue(): Value {
    return {
        nodes: [
            {
                type: 'block-p',
                children: [
                    {
                        type: 'text',
                        data: {
                            text: 'hello kitty'
                        }
                    }
                ]
            }
        ]
    }
}