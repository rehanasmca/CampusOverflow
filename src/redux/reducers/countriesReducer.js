
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  countries: []
}
export const CountriesReducer = (state = initialState, action) => {
  console.log(state, action.payload);
  switch (action.type) {
    case ActionTypes.GET_ALL_COUNTRIES_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        countries: actions
      }

    default: return state
  }
}

export function fetchCountries() {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token ///Public/CreateCountryMasterAsync
    };
    const response = await axios.get(Constants.testBaseUrl + "/Public/GetCountryMasterByIdAsync/1", { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_SUCCESS, payload: response.data.data })
  }
}

//   get users by passing skip limit
export function fetchUsersByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + '/Public/GetCountryMasterByIdAsync/1', { headers: requestOptions })
      .then(response => response);
    dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_SUCCESS, payload: response.data.data })
  }
}

// get counntry by id 
export function getCountryById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Public/GetCountryMasterByIdAsync/${id}`, { headers: requestOptions })
      .then(response => {
        if (response.data.data) {
          return response.data;

        } else {
          return { type: "ERROR", body: { message: "something went wrong" } };
        }
      })
      .catch(err => {
        return  err.message ;
      })
    return response;
  }

}

// delete user by id
export function deleteCountryByID(values) {
  return async function deleteCountry(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Public/DeleteCountryMasterAsync/${values}`, { headers: requestOptions })
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
export function updateCountryValues(values) {
  return async function updateCountryValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Public/UpdateCountryMasterAsync", values, { headers: requestOptions })
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
export function CreateNewCountry(values) {
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


