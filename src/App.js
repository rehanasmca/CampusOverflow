import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar1 from './components/sidebar';
import Navbar from './components/sidebar2';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from './header'; //Include Heder
import Footer from './footer'; //Include Footer
import Home from './home';
import Products from './components/products';
import Electronics from './components/electronics';
import Mybrand from './components/mybrand';
import Adduser from './components/adduser';
import Login from './components/login';
import Edituser from './components/edituser';
// import Carasol from './components/carasol';
class App extends React.Component {

  render() {
    return (
      <div>
        <div >
          <Router>
           
          <Header></Header>
          {/* <Navbar /> */}
            <Switch>
            <Route exact path='/' component={Home}></Route>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/products' component={Products}></Route>
              <Route exact path='/electronics' component={Electronics}></Route>
              <Route exact path='/mybrand' component={Mybrand}></Route>
              <Route exact path='/adduser' component={Adduser}></Route>
              <Route exact path='/login' component={Login}></Route>
              <Route exact path='/edituser' component={Edituser}></Route>
           
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