import {AppStore} from "./AppStore";

export function rootReducer(state: AppStore | undefined, action: any) {
    if (state === undefined) {
        return {} as AppStore;
    }

    return state;
}