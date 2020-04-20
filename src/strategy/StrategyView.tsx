import React, {CSSProperties, FunctionComponent, useState} from 'react';
import {Button, Fab} from "@material-ui/core";
import StrategyEditor from "./StrategyEditor";
import {Strategy} from "./Strategy";
import {Value} from "../common";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
interface Props extends Value<Strategy> {
}

const visible = (v: boolean): CSSProperties => {
    if (v) {
        return {}
    } else {
        return {display: 'none'}
    }
};

const StrategyView: FunctionComponent<Props> = (props) => {
    const [editMode, setEditMode] = useState(false);

    let plusMinus;
    switch (props.value.operator) {
        case "+":
            plusMinus = "加法";
            break;
        case "-":
            plusMinus = '减法';
            break;
        default:
            plusMinus = '加减法';
    }

    const showText = `【${props.value.max}】以内【${plusMinus}】`;
    return <div className='strategy-view'>
        <div className='action-btn'>
            <Fab color="primary" size='small' style={visible(!editMode)} aria-label="edit" onClick={() => setEditMode(true)}>
                <EditRoundedIcon/>
            </Fab>
            
            <Button variant="contained"
                    style={visible(editMode)}
                    onClick={e => {
                        setEditMode(false);
                    }}
                    color="secondary">保存</Button>
        </div>
        <div style={visible(editMode)}>
            <StrategyEditor value={props.value} onChange={props.onChange}/>
        </div>
        <h2 style={visible(!editMode)}>
            {showText}
        </h2>

    </div>;
};

export default StrategyView;
