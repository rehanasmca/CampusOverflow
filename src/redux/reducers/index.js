import { combineReducers }  from "redux";
import {LoginReducer} from "./loginReducer";
import { RolesReducer } from "./rolesReducer";
import { UsersReducer} from './usersReducer';
import {PermissionReducer} from './permissionsReducer';
const Reducers = combineReducers({
    login: LoginReducer,
    roles: RolesReducer,
    users: UsersReducer,
    permissions : PermissionReducer
});
export default Reducers;