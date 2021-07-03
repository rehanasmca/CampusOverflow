
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';

const initialState = {
   roles: []
}
export const RolesReducer = (state = initialState, action) => {
    console.log(state, action.payload);
    switch (action.type) {
        case ActionTypes.GET_ROLES_SUCCESS:
            let actions = action.payload;
            console.log(actions)
            return {
                roles: actions,
               
            }
        default: return state
    }
}

// get all roles
export function fetchRoles() {
    return async function getData(dispatch, getState) {
      const oldState = getState();
    //   let token = oldState.login.accessToken;
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      };
      const response = await axios.get(Constants.testBaseUrl + "/Account/GetAllRoleMasterAsync", { headers: requestOptions })
        .then(response =>{ console.log(response); return response});
  
      dispatch({ type: ActionTypes.GET_ROLES_SUCCESS, payload: response.data.data })
    }
  }
  
  //   get users by passing skip limit

export function fetchRolesByLimit(values) {
  return async function getUsers(dispatch, getState) {
    const oldState = getState();
    // let token = oldState.login.accessToken;
    
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Account/GetRoleMasterByIdAsync/?id=1`, { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_ROLES_SUCCESS, payload: response.data.data })
  }
}

// fetch permissions by role id
export function fetchPermissionsByRoleId(roleId) {
  return async function getUsers(dispatch, getState) {
    const oldState = getState();
    // let token = oldState.login.accessToken;
    
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Account/GetRolePermissionsAsync/${roleId}`, { headers: requestOptions })
      .then(response =>{
         if (response.data.data) {
        return response.data;
       } else {
         return { type: "ERROR", body: { message: "something went wrong" } };
       }
     })
     .catch(err => {
       return { type: "error", body: { message: err.message } };
     })
return response;
 }
}

// set permissions by role id
export function setPermissionsByRoleId(values) {
  return async function getData(dispatch, getState) {
    const oldState = getState();
    // let token = oldState.login.accessToken;
    
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl +'/Account/SetRolePermissionsAsync', values, { headers: requestOptions })
      .then(response =>{
         if (response.data.data) {
        return response.data;
       } else {
         return { type: "ERROR", body: { message: "something went wrong" } };
       }
     })
     .catch(err => {
       return err.message;
     })
return response;
 }
}


