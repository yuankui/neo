import React, {FunctionComponent, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Strategy} from "../../strategy/Strategy";
import {Base64} from "js-base64";
import Section from "./Section";
import {Button} from "@material-ui/core";

interface Props {
}

export interface Quiz {
    num1?: number,
    operator: string,
    num2?: number,
    num3?: number,
}

const createDefaultStrategy = (): Strategy => {
    return {
        levelUp: true,
        space: 2,
        operator: "+",
        max: 100,
        quizLine: 10,
    };
};

interface StrategyParam {
    config: string,
}

const MathApp: FunctionComponent<Props> = (props) => {
    const params = useParams<StrategyParam>();
    console.log(params);
    const history = useHistory();

    let defaultStrategies: Array<Strategy> = [createDefaultStrategy()];

    try {
        let str = Base64.decode(params.config);
        let js = JSON.parse(str);
        if (js != null) {
            defaultStrategies = js;
        }
    } catch (e) {
    }

    const [strategies, setStrategies] = useState<Array<Strategy>>(defaultStrategies);

    const updateStrategies = (s: Array<Strategy>) => {
        setStrategies(s);
        history.push(`/math1/${Base64.encode(JSON.stringify(s))}`);
    };
    const addSection = () => {
        updateStrategies([
            ...strategies,
            createDefaultStrategy(),
        ]);
    };

    const elements = strategies.map((strategy, i) => {
        return <Section strategy={strategy} onChange={s => {
            const newS = strategies.map((oldS, oldI) => {
                if (oldI === i) {
                    return s;
                } else {
                    return oldS;
                }
            });

            updateStrategies(newS);
        }}/>
    });

    return (
        <div>
            {elements}
            <Button color={'primary'} onClick={addSection}>增加题目</Button>
        </div>
    );
};

export default MathApp;
