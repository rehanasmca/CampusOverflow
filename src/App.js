import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar1 from './components/sidebar';
import Navbar from './components/sidebar2';
import './App.css';
import Roles from './components/roles-management/allRoles';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/header-component/header'; //Include Heder
import Footer from './footer'; //Include Footer
import Home from './home';
import Products from './components/products';
import Electronics from './components/electronics';
import Mybrand from './components/mybrand';
import Adduser from './components/users-component/adduser';
import Login from './components/Login-component/login';
import Permissions from './components/permision-management/allPermisions';
import AddPermission from './components/permision-management/addPermission';
// import Carasol from './components/carasol';
import NavBar from './components/navbar2';
import Users from './components/users-component/users';
import AddRole from './components/roles-management/addRole';
import Countries from './components/countries/allCountries';
import AddCountry from './components/countries/addCountry';
import Universities from './components/university-management/allUniversities';
import AddUniversity from './components/university-management/addUniversity';
import RoleMapPermissions from './components/role-map-permissions-management/roleMapPermissions';
import ALLSettings from './components/settings-management/allSettings';
import AddSettings from './components/settings-management/addSettings';
import AllCourses from './components/course-management/allCourses';
import AddCourse from './components/course-management/addCourse';
import AddCity from './components/city-management/addCity';
import AllCities from './components/state-management/allStates';
import AddState from './components/state-management/addState';
import AllStates from './components/state-management/allStates';
class App extends React.Component {

  render() {
    return (
      <div>
        <div >
          <Router>
           
          <Header></Header>
          {/* <NavBar /> */}
            <Switch>
            <Route exact path='/' component={Home}></Route>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/products' component={Products}></Route>
              <Route exact path='/electronics' component={Electronics}></Route>
              <Route exact path='/mybrand' component={Mybrand}></Route>
              <Route exact path='/adduser' component={Adduser}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/roles' component={Roles}></Route>
              <Route exact path='/users' component={Users}></Route>
              <Route exact path='/permissions' component={Permissions}></Route>
              <Route exact path='/addPermission' component={AddPermission}></Route>
              <Route exact path='/addRole' component={AddRole}></Route>
              <Route exact path='/countries' component={Countries}></Route> 
              <Route exact path='/addCountry' component={AddCountry}></Route> 
              <Route exact path='/universities' component={Universities}></Route> 
              <Route exact path='/addUniversity' component={AddUniversity}></Route> 
              <Route exact path='/roleMapPermissions' component={RoleMapPermissions}></Route> 
              <Route exact path='/settings' component={ALLSettings}></Route> 
              <Route exact path='/addSettings' component={AddSettings}></Route> 
              <Route exact path='/allCourses' component={AllCourses}></Route> 
              <Route exact path='/addCourse' component={AddCourse}></Route> 
              <Route exact path='/addCity' component={AddCity}></Route> 
              <Route exact path='/allCities' component={AllCities}></Route> 
              <Route exact path='/state' component={AllStates}></Route> 
              <Route exact path='/addState' component={AddState}></Route> 
           
            </Switch>

          </Router>
          
          </div>
          <div style={{
              bottom:0, position: 'fixed'
          }}>
            <Footer></Footer>
          </div>
        </div>
      
    )
  };
}

export default App;