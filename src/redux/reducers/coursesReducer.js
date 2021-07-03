
import { ActionTypes } from "../constants/action-types";
import axios from 'axios';
import { Constants } from '../../constatnts';
const initialState = {
  courses: []
}
export const CoursesReducer = (state = initialState, action) => {
  console.log(state, action.payload);
  switch (action.type) {
    case ActionTypes.GET_ALL_COURSES_SUCCESS:
      let actions = action.payload;
      console.log(actions)
      return {
        courses: actions
      }

    default: return state
  }
}

export function fetchCourses() {
    console.log("get call")
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token 
    };
    const response = await axios.get(Constants.testBaseUrl + "/Education/GetAllCourseMasterAsync/0/10/false", { headers: requestOptions })
      .then(response => response);
console.log(response)
    dispatch({ type: ActionTypes.GET_ALL_COURSES_SUCCESS, payload: response.data.data })
  }
}

//   get users by passing skip limit
export function fetchcoursesByLimit(values) {
  return async function getUsers(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Education/GetAllCourseMasterAsync/${values}/10/false`, { headers: requestOptions })
      .then(response => response);
    dispatch({ type: ActionTypes.GET_ALL_COURSES_SUCCESS, payload: response.data.data })
  }
}

// get counntry by id 
export function getCourseById(id) {
  return async function getData(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.get(Constants.testBaseUrl + `/Education/GetCourseMasterByIdAsync/${id}`, { headers: requestOptions })
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
export function deleteCourseByID(id) {
  return async function deleteCountry(dispatch, getState) {
    const oldState = getState();
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + `/Education/DeleteCourseMasterAsync/${id}`, { headers: requestOptions })
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
export function updateCourseValues(values) {
  return async function updateCountryValues(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Education/UpdateCourseMasterAsync", values, { headers: requestOptions })
      .then(res => {
          console.log(res)
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
export function CreateNewCourse(values) {
  return async function createCountry(dispatch, getState) {
    let t = JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const response = await axios.post(Constants.testBaseUrl + "/Education​/CreateCourseMasterAsync", values, { headers: requestOptions })
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


