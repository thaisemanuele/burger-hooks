import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utilities';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email:{
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            errorMessage: "Please enter a valid e-mail address",
            touched: false
        },
        password:{
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            errorMessage: "At least 6 characters",
            touched: false
        },
    });
    const [isSignup, setIsSignUp] = useState(true);

    useEffect(() => {
        if(!props.buildingBurger && props.authRedirectPath !== '/'){
            props.onSetAuthRedirectPath()
        }
    }, []);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };
        setAuthForm(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(prevIsSignup => !prevIsSignup)
    };

    
    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            errorMessage = {formElement.config.errorMessage}
            touched = {formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}/>
        )
    );
    if (props.loading) {
        form = <Spinner />;
    }

    const errorMessage = props.error ? <p>{props.error.message}</p> : null;

    const authRedirect = props.isAuthenticated ? <Redirect to={props.authRedirectPath} /> : null;

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <h3>{isSignup ? "SIGN UP" : "SIGN IN"}</h3>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            {errorMessage}
            <Button btnType="Danger" clicked={switchAuthModeHandler} >SWITCH TO {isSignup ? "SIGN IN" : "SIGN UP"}</Button>
        </div>
    );

};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);