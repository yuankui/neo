interface Any {
    [key: string]: any,
}
export interface Node extends Any {
    type: string,
    data?: any,
    children?: Array<Node>,
}