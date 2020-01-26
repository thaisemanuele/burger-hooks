import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classes from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <Fab 
            disabled={props.disabled}
            style={{backgroundColor: `${props.disabled? "#AC9980":"#d0b497"}`, color:`${props.disabled? "#bb662da1":"#E27b36"}`}} 
            aria-label="remove" onClick={props.removed}>
            <RemoveIcon />
        </Fab>
        <Fab 
            style={{backgroundColor: "#e27b36", color:"#f5da8d"}} 
            aria-label="add" onClick={props.added}>
            <AddIcon />
        </Fab>
    </div>
);

export default buildControl;