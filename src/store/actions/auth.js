import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as config from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup=true) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        const url = isSignup ? config.FIREBASE_SIGNUP_URL : config.FIREBASE_SIGNIN_URL;
        axios.post(url, authData)
        .then ( response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));   
            dispatch(checkAuthTimeout(response.data.expiresIn));         
        })
        .catch ( err => {
            dispatch(authFailed(err.response.data.error));
        });
    };
};