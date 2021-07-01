
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';

const initialState = {
   permissions: []
}
export const PermissionReducer = (state = initialState, action) => {
    console.log(state, action.payload);
    switch (action.type) {
        case ActionTypes.GET_PERMISSIONS_SUCCESS:
            let actions = action.payload;
            console.log(actions)
            return {
            permissions: actions,

            }
        default: return state
    }
}

// get all roles
export function fetchPermissions() {
    return async function getData(dispatch, getState) {
      const oldState = getState();
      console.log(JSON.parse(localStorage.getItem("userData")))
      let t =JSON.parse(localStorage.getItem("userData"))
      let token = t.accessToken;
      const requestOptions = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      };
      const response = await axios.get(Constants.testBaseUrl + "/Account/GetPermissionMasterByIdAsync/?id=1", { headers: requestOptions })
        .then(response => response);
  
      dispatch({ type: ActionTypes.GET_PERMISSIONS_SUCCESS, payload: response.data.data })
    }
  }
  
  //   get users by passing skip limit

export function fetchPermissionsByLimit(values) {
  return async function getUsers(dispatch, getState) {
    const oldState = getState();
    // let token = oldState.login.accessToken;
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + '/Account/GetPermissionMasterByIdAsync/?id=1', { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_PERMISSIONS_SUCCESS, payload: response.data.data })
  }
}

