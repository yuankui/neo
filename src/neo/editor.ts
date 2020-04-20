import {HookRegister, HookRegisterConsumer} from "neo-hooks";

export class Editor {
    register: HookRegister;
    constructor(consumers?: Array<HookRegisterConsumer>) {
        this.register = new HookRegister();
        if (consumers) {
            consumers.forEach(c => {
                c.init(this.register);
            })
        }
    }
}