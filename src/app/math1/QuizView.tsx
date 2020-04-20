import React, {FunctionComponent} from 'react';
import {Quiz} from "./MathApp";

interface Props {
    problems: Array<Quiz>,
}

const QuizView: FunctionComponent<Props> = (props) => {

    const show = (v?: number) => {
        if (v != null) {
            return <span>{v}</span>;
        } else {
            return <div className='space-box'/>
        }
    };
    const ps = props.problems.map((p, i) => {
        return <div key={i}>
            <div>{show(p.num1)}</div>
            <div className='operator'>{p.operator}</div>
            <div>{show(p.num2)}</div>
            <div className='eq'>=</div>
            <div>{show(p.num3)}</div>
        </div>;
    });
    return <div className='row'>
        {ps}
    </div>;
};

export default QuizView;
