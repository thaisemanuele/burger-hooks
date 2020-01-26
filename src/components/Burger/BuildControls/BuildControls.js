import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';


const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
];

const OrderButton = withStyles( theme => ({ 
    root: {
        backgroundColor: '#d2bda7',
        outline: 'none',
        cursor: 'pointer',
        border: '1px solid #966909',
        color: '#966909',
        fontFamily: 'inherit',
        padding: '15px 30px',
        marginTop:'30px',
        boxShadow: '2px 2px 2px #966909',
        '&:disabled': {
            boxShadow: 'none',
            backgroundColor: 'inherit',
            borderColor: '#af7d4f',
        },
        '&:hover, &:active': {
            backgroundColor: '#efdba4',
            border: '1px solid #966909',
            color: '#966909'
        },
        [theme.breakpoints.down(459)]: {
            padding: '15px 15px',
            marginTop:'10px',
        },
    }
}))(Button);

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl =>(
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                added = { () => props.ingredientAdded(ctrl.type)}
                removed = { () => props.ingredientRemoved(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
            />
            )
        )}
        <OrderButton 
            variant={!props.purchasable ? "outlined": "contained"}  
            disabled={!props.purchasable} 
            onClick={props.ordered}>
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </OrderButton>
    </div>
);

export default buildControls;