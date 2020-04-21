import 'jest';
import {Editor, ValueListener} from "./editor";
import {emptyValue} from "./models/value";
import {HookRegister, HookRegisterConsumer} from "neo-hooks";
import {CommandFunc} from "./models/command";

test("hello", () => {
    const consumers: Array<HookRegisterConsumer> = [
        {
            name: "command",
            init(hookRegister: HookRegister): void {
                hookRegister.register<CommandFunc>({
                    name: 'command',
                    id: 'init-command',
                    hook: (command, editor1, next) => {
                        editor1.setValue({
                            nodes: [
                                {
                                    type: 'block-p',
                                    children: [
                                        {
                                            type: 'text',
                                            data: {
                                                text: 'hello kitty2'
                                            }
                                        }
                                    ]
                                }
                            ]
                        })
                    }
                });

                hookRegister.register<ValueListener>({
                    name: 'value.listener',
                    id: 'init-command2',
                    hook: (v, editor1, next) => {
                        console.log(JSON.stringify(v));
                    }
                });
            }
        }
    ]
    const editor = new Editor(emptyValue(), consumers);

    editor.command({
        type: 'update',
        args: [],
    })
})