import {useSelector} from "react-redux";
import {Strategy} from "../strategy/Strategy";

export interface MathStore {
    strategy: Strategy,
}

export interface AppStore {
    math: MathStore,
}

export function useAppStore() {
    return useSelector(state => state) as AppStore;
}