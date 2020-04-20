import {Node} from "./node";
import {Selection} from "./selection";

export interface Value {
    value: Array<Node>,
    selection?: Selection,
}

export function emptyValue(): Value {
    return {
        value: [
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