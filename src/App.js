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