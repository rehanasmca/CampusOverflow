
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  users: []
}
export const UsersReducer = (state = initialState, action) => {
  console.log(state, action.payload);
  switch (action.type) {
    case ActionTypes.GET_USER_SUCCESSFULLY:
      let actions = action.payload;
      console.log(actions)
      return {
        users: actions
      }

      case ActionTypes.UPDATE_USER_SUCCESSFULLY:
        return state
      case ActionTypes.DELETE_USER_SUCCESSFULLY: 
      return state
        

    default: return state
  }
}

export function fetchUsers() {
  return async function getData(dispatch, getState) {
    const oldState = getState();
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + "/Account/GetAllUserMasterAsync/?pagendex=0&pageSize=10&showHidden=false", { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_USER_SUCCESSFULLY, payload: response.data.data })
  }
}

//   get users by passing skip limit

export function fetchUsersByLimit(values) {
  return async function getUsers(dispatch, getState) {
    const oldState = getState();
    let token = oldState.login.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Account/GetAllUserMasterAsync/?pagendex=${values}&pageSize=10&showHidden=false`, { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_USER_SUCCESSFULLY, payload: response.data.data })
  }
}


// delete user by id
export function deleteUsersByID(values) {
  return async function deleteUser(dispatch, getState) {
    const oldState = getState();
    // let token = oldState.login.accessToken;
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Account/DeleteUserMaster/?id=${values}}`, { headers: requestOptions })
      .then(res => res);

    dispatch({ type: ActionTypes.DELETE_USER_SUCCESSFULLY , payload: response})
  }
}

// update user
export function updateUserValues(values) {
  return async function updateUser(dispatch, getState) {
    // const oldState = getState();
    // let token = oldState.login.accessToken;
    let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    let data = {
      userName: values.userName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      dateInserted: values.dateInserted,
      dateUpdated: new Date(),
      active: true,
      deleted: false,
      roles: []
    }

    const response = await axios.post(Constants.testBaseUrl + "/Account/UpdateUserMaster", data, { headers: requestOptions })
      .then(res => res)
          dispatch({ type: ActionTypes.UPDATE_USER_SUCCESSFULLY, payload: response.data.data });


  }
}



