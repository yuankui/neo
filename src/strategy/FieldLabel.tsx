import React, { FunctionComponent } from 'react';

interface Props {
    title: string
}

const FieldLabel: FunctionComponent<Props> = (props) => {
    return <div className='form-label'>
        <div className='title'>{props.title}</div>
        <div style={{width: 500}}>
            {props.children}
        </div>
    </div>;
};

export default FieldLabel;
