import  {ActionTypes} from "../constants/action-types";
export const getPermissionSucceeded = (values) => {
    console.log(values)
  return {
    type: ActionTypes.GET_PERMISSIONS_SUCCESS,
    payload: values
    }
}
