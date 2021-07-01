import  {ActionTypes} from "../constants/action-types";
import axios from 'axios';

export const login = (values) =>{
    console.log(values);
    return {
        type: ActionTypes.LOGIN,
        payload: values
    };
}
 export const loginSuccess = (values) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: values
    };
};

export const loginFail = (values) => {
    return {
        type: ActionTypes.LOGIN_FAIL,
        payload: values
    };
}

export const getUsers = (values) => {
    return {
        type: ActionTypes.GET_USER_SUCCESSFULLY,
        payload: values
    };
}

export const getUserUpdated = (values) => {
    return {
        type: ActionTypes.UPDATE_USER_SUCCESSFULLY,
        
    };
}

export const deletUser =() =>{
    return {type: ActionTypes.DELETE_USER_SUCCESSFULLY}
}

