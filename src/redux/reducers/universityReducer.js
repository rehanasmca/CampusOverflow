
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  universities: []
}
export const UniversityReducer = (state = initialState, action) => {
  console.log(state, action.payload);
  switch (action.type) {
    case ActionTypes.GET_ALL_UNIVERCITIES_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        universities: actions
      }

    default: return state
  }
}

export function fetchUniversities() {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token ///Public/CreateCountryMasterAsync
    };
    const response = await axios.get(Constants.testBaseUrl + "/Education/GetAllUniversityDetailAsync/0/10/false", { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_ALL_UNIVERCITIES_SUCCESS, payload: response.data.data })
  }
}

//   get users by passing skip limit

export function fetchUniversitiesByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + '/Education​/GetAllUniversityDetailAsync​/0​/10​/false', { headers: requestOptions })
      .then(response => response);

    dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_SUCCESS, payload: response.data.data })
  }
}

// get university by id 
export function getUniversityById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Education/GetUniversityDetailByIdAsync/${id}`, { headers: requestOptions })
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

// delete university by id
export function deleteUniversityByID(id) {
  return async function deleteCountry(dispatch, getState) {
   let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `​/Education​/DeleteUniversityDetailAsync​/${id}`, { headers: requestOptions })
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
export function updateUniversityValues(values) {
  return async function updateValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Education/UpdateUniversityDetailAsync", values, { headers: requestOptions })
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

// create new university
export function CreateNewUniversity(values) {
  return async function createUniversity(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Education/CreateUniversityDetailAsync", values, { headers: requestOptions })
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


