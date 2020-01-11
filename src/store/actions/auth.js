import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as config from '../../config';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post(config.FIREBASE_SIGNUP_URL, authData)
        .then ( response => {
            console.log(response);
            dispatch(authSuccess(response.data));            
        })
        .catch ( err => {
            console.log(err);
            dispatch(authFailed(err));
        });
    };
};