import {Support} from "./support";

export interface Supporter<T extends Support = Support> {
    init(supports: Array<T>): Promise<void>;

}