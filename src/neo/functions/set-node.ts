import {NeoFunctionProvider} from "../models/functions";
import {Path} from "../models/path";

export const setNode: NeoFunctionProvider<any> = {

}

export interface SetNodeParam {
    path: Path,
    type: string,
    data?: any,
}

export const SetNodeName = 'neo.set.name';