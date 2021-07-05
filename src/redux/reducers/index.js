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
import { EmailsReducer, QueuedEmailsReducer } from "./emailReducer";
import { SendedEmailReducer} from './emailReducer';
import { SMSReducer } from "./smsRducer";
import { SMSTemplateReducer } from "./smsTemplateReducer";
import {QueuedSMSReducer} from "./smsRducer";
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
    emails: EmailsReducer,
    sendedemails : SendedEmailReducer,
    sms: SMSReducer,
    smsTemplates : SMSTemplateReducer,
    queuedSms: QueuedSMSReducer,
    queuedemails: QueuedEmailsReducer
});
export default Reducers;