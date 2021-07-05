
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  emails: []
}
const initialEmail ={
  sendedemails :[]
}

const queued ={
  queuedemails: []
}

export const QueuedEmailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_QUEUED_EMAILS_SUCCESS":
      let actions = action.payload;
      console.log(actions)
      return {
        queuedemails: actions
      }

    default: return state
  }
}

export const EmailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_EMAILS_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        emails: actions
      }

    default: return state
  }
}

export const SendedEmailReducer = (state = initialEmail, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_SENDED_EMAILS_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        sendedemails: actions
      }

    default: return state
  }
}

export function fetchEmails() {
      return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    };
    const response = await axios.get(Constants.testBaseUrl + "/Communication/GetAllEmailAccountAsync", { headers: requestOptions })
      .then(response => response);
console.log(response)
    dispatch({ type: ActionTypes.GET_ALL_EMAILS_SUCCESS, payload: response.data.data })
  }
}

// fetch queued emails
export function fetchQueuedEmails() {
  return async function getData(dispatch, getState) {
let t = JSON.parse(localStorage.getItem("userData"))
let token = t.accessToken;
const requestOptions = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token 
};
const response = await axios.get(Constants.testBaseUrl + "/Communication/GetAllQueuedEmailAsync/0/10/false", { headers: requestOptions })
  .then(response => response);
console.log(response)
dispatch({ type:"GET_ALL_QUEUED_EMAILS_SUCCESS", payload: response.data.data })
}
}



//   get states by passing skip limit
export function fetchSendedEmails(values) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetAllEmailSendDetailAsync/0/10/false`, { headers: requestOptions })
      .then(response => response);
    dispatch({ type: ActionTypes.GET_ALL_SENDED_EMAILS_SUCCESS, payload: response.data.data })
  }
}

// create emailSended 
export function CreateEmailSended(values) {
  return async function create(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/CreateEmailSendDetailAsync", values, { headers: requestOptions })
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

// get state by id 
export function getEmailById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetEmailAccountByIdAsync/${id}`, { headers: requestOptions })
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

// delete state by id
export function deleteEmailByID(id) {
  return async function deleteEmail(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Communication/DeleteEmailAccountAsync/${id}`, { headers: requestOptions })
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

// update state
export function updateEmail(values) {
  return async function updateEmailValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/UpdateEmailAccountAsync", values, { headers: requestOptions })
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


// create new state
export function CreateEmail(values) {
  return async function create(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/CreateEmailAccountAsync", values, { headers: requestOptions })
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


// create new queued email
export function CreateQueuedEmail(values) {
  return async function create(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication​/CreateQueuedEmailAsync", values, { headers: requestOptions })
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
// get queued email by id
export function getQueuedEmailById(id) {
  return async function getQueuedEmail(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Communication/GetQueuedEmailByIdAsync/${id}`, { headers: requestOptions })
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

// update queued email 
export function updateQueuedEmail(values) {
  return async function updateEmailValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Communication/UpdateQueuedEmailAsync", values, { headers: requestOptions })
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