import React, {FunctionComponent, useEffect, useState} from 'react';
import {Strategy} from "../../strategy/Strategy";
import {range} from "rxjs";
import {bufferCount, catchError, map, toArray} from "rxjs/operators";
import {generateQuiz} from "../../strategy/quizGenerator";
import QuizView from "./QuizView";
import StrategyView from "../../strategy/StrategyView";
import {Consumer} from "../../common";
import {Quiz} from "./MathApp";

interface Props {
    strategy: Strategy,
    onChange: Consumer<Strategy>,
}

const Section: FunctionComponent<Props> = (props) => {

    const [problems, setProblems] = useState<Array<Array<Quiz>>>([]);

    const updateStrategy = (strategy: Strategy) => {
        props.onChange(strategy);
    };

    const columns = 7;
    useEffect(() => {
        range(0, props.strategy.quizLine * columns)
            .pipe(
                map(() => {
                    return generateQuiz(props.strategy)
                }),
                bufferCount(7),
                toArray(),
                catchError((err, caught) => {
                    alert(err);
                    return [];
                })
            )
            .subscribe(value => {
                setProblems(value);
            })
    }, [props.strategy]);

    const cube = problems.map((row,i) => {
        return <QuizView key={i} problems={row}/>
    });

    return (
        <div className='quiz-section'>
            <StrategyView value={props.strategy} onChange={value => {
                updateStrategy(value);
            }}/>
            {cube}
        </div>
    );
};

export default Section;
