
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  settings: []
}
export const SettingsReducer = (state = initialState, action) => {
  console.log(state, action.payload);
  switch (action.type) {
    case ActionTypes.GET_ALL_SETTINGS_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        settings: actions
      }

    default: return state
  }
}

// get all settings
export function fetchSettings() {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    };
    const response = await axios.get(Constants.testBaseUrl + "/Account/GetAllSettingAsync", { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_SUCCESS, payload: response.data.data })
  }
}

//   get all settings by passing index size
export function fetchSettingsByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + '/Public/GetCountryMasterByIdAsync/1', { headers: requestOptions })
      .then(response => response);
    dispatch({ type: ActionTypes.GET_ALL_SETTINGS_SUCCESS, payload: response.data.data })
  }
}

// get settings by id 
export function getSettingsById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Account/GetSettingByIdAsync/${id}`, { headers: requestOptions })
      .then(response => {
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

// delete user by id
export function deleteSettingsByID(id) {
  return async function deleteCountry(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Account​/DeleteSettingAsync​/${id}`, { headers: requestOptions })
      .then(response => {
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

// update user
export function updateSettingsValues(values) {
  return async function updateCountryValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Account​/Updatesetting", values, { headers: requestOptions })
      .then(res => {
        if (res.data.data) {
          return res.data;

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


// create new country
export function CreateNewSetting(values) {
  return async function createCountry(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Public/CreateCountryMasterAsync", values, { headers: requestOptions })
      .then(res => {
        if (res.data.data) {
          return res.data;
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


