
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  emailTemplates: []
}
export const EmailTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_EMAIL_TEMPLATES_SUCCESS":
      let actions = action.payload;
      console.log(actions)
      return {
        emailTemplates: actions
      }

    default: return state
    
  }
}

export function fetchEmailTemplates() {
      return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    };
    const response = await axios.get(Constants.testBaseUrl + "/Communication/GetAllEmailTemplateAsync/0/10/false", { headers: requestOptions })
      .then(response => response);
console.log(response)
    dispatch({ type:"GET_ALL_EMAIL_TEMPLATES_SUCCESS", payload: response.data.data })
  }
}

//   get users by passing skip limit
export function fetchEmailTemplatesByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetAllEmailTemplateAsync/${values}/10/false`, { headers: requestOptions })
      .then(response => response);
    dispatch({ type: "GET_ALL_EMAIL_TEMPLATES_SUCCESS", payload: response.data.data })
  }
}

// get template by id 
export function getEmailTemplateById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetEmailTemplateByIdAsync/${id}`, { headers: requestOptions })
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

// delete email template by id
export function deleteEmailTemplateByID(id) {
  return async function deleteTemplate(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Communication/DeleteEmailTemplateAsync/${id}`, { headers: requestOptions })
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

// update template
export function updateTemplate(values) {
  return async function updateValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/UpdateEmailTemplateAsync", values, { headers: requestOptions })
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


// create new template
export function CreateNewTemplate(values) {
  return async function createTemplate(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/CreateEmailTemplateAsync", values, { headers: requestOptions })
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


