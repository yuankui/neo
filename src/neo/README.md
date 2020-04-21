# Neo

## 核心概念

### function
组件可以实现方法，并且可以通过editor调用function

### event
组件可以通过editor发送事件，这个事件，会从Node最底层，层层上抛，直到被处理

## Node Render
负责节点的渲染，包含以下几个熟悉
- name：节点类型名
- render：负责渲染节点
- onEvent：接受事件，做出逻辑处理