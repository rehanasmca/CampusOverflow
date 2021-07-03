import { combineReducers }  from "redux";
import {LoginReducer} from "./loginReducer";
import { RolesReducer } from "./rolesReducer";
import { UsersReducer} from './usersReducer';
import {PermissionReducer} from './permissionsReducer';
import {CountriesReducer} from './countriesReducer';
import {UniversityReducer} from './universityReducer';
import {SettingsReducer} from './settingsReducer';
import {CoursesReducer} from './coursesReducer';
import {CitiesReducer} from './citiesReducer';
import {StatesReducer} from './statesReducer';
const Reducers = combineReducers({
    login: LoginReducer,
    roles: RolesReducer,
    users: UsersReducer,
    permissions : PermissionReducer,
    countries: CountriesReducer,
    universities: UniversityReducer,
    settings: SettingsReducer,
    courses: CoursesReducer,
    cities: CitiesReducer,
    states: StatesReducer,
});
export default Reducers;