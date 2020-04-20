import React, { FunctionComponent } from 'react';

interface Props {}

const NeoEditor: FunctionComponent<Props> = (props) => {
    const onBeforeInput = (e: React.FormEvent) => {
        e
    }
    return <div contentEditable="true"
                className='neo-editor'
                onBeforeInput={onBeforeInput}>
        Neo Editor
    </div>;
};

export default NeoEditor;
