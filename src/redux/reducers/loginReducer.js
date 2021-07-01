
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';

const initialState = {
    accessToken: '',
    userName: '',
    role: '',
    refreshToken: ''
}
export const LoginReducer = (state = initialState, action) => {
    console.log(state, action.payload);
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.setItem("userData" ,JSON.stringify(action.payload));
            let actions = action.payload;
            console.log(actions)
            return {
                accessToken: actions.accessToken,
                userName: actions.userName,
                role: actions.role,
                refreshToken: actions.refreshToken
            }
        default: return state
    }
}



// login user
export function loginUser(values) {
    return async function login(dispatch, getState) {
      let data = {
        userName: values.userName,
         password: values.password
      }
  
      const response = await axios.post(Constants.testBaseUrl + "/Account/login", data)
        .then(res => res)
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data.data });
  
  
    }
  }
  
