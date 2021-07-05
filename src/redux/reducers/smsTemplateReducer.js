
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  smssmsTemplates: []
}
export const SMSTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_SMS_TEMPLATES_SUCCESS":
      let actions = action.payload;
      console.log(actions)
      return {
        smsTemplates: actions
      }

    default: return state
    
  }
}

export function fetchSMSTemplates() {
      return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    };
    const response = await axios.get(Constants.testBaseUrl + "/Communication/GetAllSMSTemplateAsync/0/10/false", { headers: requestOptions })
      .then(response => response);
console.log(response)
    dispatch({ type: "GET_ALL_SMS_TEMPLATES_SUCCESS", payload: response.data.data })
  }
}

//   get users by passing skip limit
export function fetchSMSByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication​/GetAllSMSSendDetailAsync​/${values}/10/false`, { headers: requestOptions })
      .then(response => response);
    dispatch({ type: ActionTypes.GET_ALL_SMS_SUCCESS, payload: response.data.data })
  }
}

// get city by id 
export function getSmsById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetSMSSendDetailByIdAsync/${id}`, { headers: requestOptions })
      .then(response => {
        if (response.data.data) {
          return response.data;

        } else {
          return "something went wrong";
        }
      })
      .catch(err => {
        return  err.message;
      })
    return response;
  }

}

// delete city by id
export function deleteCityByID(id) {
  return async function deleteCity(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Public/DeleteCityMasterAsync/${id}`, { headers: requestOptions })
      .then(response => {
        if (response.data.data) {
          return response.data;

        } else {
           return "something went wrong";
        }
      })
      .catch(err => {
        return err.message;

      })

    return response;
  }
}

// update city
export function updateSMS(values) {
  return async function updateSMSValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/UpdateSMSSendDetailAsync", values, { headers: requestOptions })
      .then(res => {
          console.log(res)
        if (res.data.data) {
          return res.data;
        } else {
          return { type: "ERROR", body: { message: "something went wrong" } };
        }
      })
      .catch(err => {
        return  err.message;
      })
     return response;
  }
}


// create new city
export function CreateNewCity(values) {
  return async function createCity(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Public/CreateCityMasterAsync", values, { headers: requestOptions })
      .then(res => {
        if (res.data.data) {
          return res.data;
        } else {
          return  "something went wrong";
        }
      })
      .catch(err => {
        return err.message;
      })
     return response;
  }
}


