import {HookRegister} from "neo-hooks";

export class Editor {
    register: HookRegister;
    constructor() {
        this.register = new HookRegister();
    }
}