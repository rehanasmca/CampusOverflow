import  {ActionTypes} from "../constants/action-types";
export const gerolesSucceeded = (values) => {
  return {
    type: ActionTypes.GET_ROLES_SUCCESS,
    payload: values
    }
}

