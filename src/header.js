import React from 'react';
import { Link } from 'react-router-dom';
import Classes from './header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaAlignRight } from 'react-icons/fa';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoginModal from './components/loginModal';
import GetModal from './components/getModal';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: {}, isLogin:false };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
    let data = localStorage.getItem('userData');
    if(data){
      this.setState({isLogin : true});
      this.menusState = true;
    }
  }
  menusState = false;
  toggleOpen = (menu) => {
    let data = { ...this.state }
    data.value[menu].isOpen = true;
    this.setState({ data });
  }

  toggleClose = (menu) => {
    let data = { ...this.state }
    data.value[menu].isOpen = false;
    this.setState({ data });
  }

  toggleOpensub = (menu, subMenu) => {
    let data = { ...this.state }
    data.value[menu][subMenu].isOpen = true;
    this.setState({ data });
  }

  toggleClosesub = (menu, subMenu ) => {
    let data = { ...this.state }
    data.value[menu][subMenu].isOpen = false;
    this.setState({ data });
  }

  toggleOpen1 = (menu,subMenu, level1menu ) => {
    let data = { ...this.state }
    data.value[menu][subMenu][level1menu].isOpen = true;
    this.setState({ data });
  }

  toggleClose1 = (menu, subMenu, level1menu ) => {
    let data = { ...this.state }
    data.value[menu][subMenu][level1menu].isOpen = false;
    this.setState({ data });
  }

  toggleOpen2 = (menu, subMenu, level1menu, level2menu ) => {
    let data = { ...this.state }
    data.value[menu][subMenu][level1menu][level2menu].isOpen = true;
    this.setState({ data });
  }

  toggleClose2 = (menu,  subMenu, level1menu, level2menu) => {
    let data = { ...this.state }
    data.value[menu][subMenu][level1menu][level2menu].isOpen = false;
    this.setState({ data });
  }
  getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        console.log(response)
        return response.json();
      })
      .then((myJson) => {
        console.log(myJson);
        this.setState({ value: myJson });
      });
  }
  componentDidMount() {
    this.getData();
    let data = localStorage.getItem('userData');
    if(data){
      this.menusState = true;
    }
  }

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    let keys = Object.keys(this.state.value);
    return (<>
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark" >
        <ul className="navbar-nav">
          {
            Object.keys(this.state.value).map((key, index) =>
              this.state.value[key].pathName ?
                <li key={index} className="nav-item active" ><Link to={this.state.value[key].pathName} className="nav-link" style={!this.menusState ? {color: 'lightgray', cursor: 'not-allowed'} : {color: 'white', cursor: 'pointer'}}> {key} </Link></li> :
                <div className="dropdown" 
                  onMouseEnter={() => this.toggleOpen(key)}
                  onMouseLeave={() => this.toggleClose(key)}
                >
                  <li key={index} className="nav-item active"><a className=" nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    {key}
                  </a></li>
                  <div id="items" className={this.state.value[key].isOpen ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuLink">
                    {this.state.value ? Object.keys(this.state.value[key]).map((subMenu, index) =>
                      subMenu != "isOpen" && this.state.value[key][subMenu].pathName ? <Link to={this.state.value[key][subMenu].pathName} className="dropdown-item">{subMenu}</Link>
                        : subMenu != "isOpen" && 
                        <li className="nav-item dropdown"
                        onMouseEnter={() => this.toggleOpensub(key, subMenu )}
                        onMouseLeave={() => this.toggleClosesub(key, subMenu)}
                        >
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'black' }}>
                            {subMenu}
                          </a>
                          <ul className={this.state.value[key][subMenu].isOpen ? "dropdown-menu show" : "dropdown-menu"}>
                            {Object.keys(this.state.value[key][subMenu]).map((childMenu, index) =>
                              childMenu != "isOpen" && this.state.value[key][subMenu][childMenu].pathName ? <li><Link to={this.state.value[key][subMenu][childMenu].pathName} className="dropdown-item">{childMenu}</Link></li> :
                                  childMenu != "isOpen" && <li className="nav-item dropdown"
                                onMouseEnter={() => this.toggleOpen1(key, subMenu, childMenu)}
                                onMouseLeave={() => this.toggleClose1(key, subMenu,childMenu )}
                                >
                                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'black' }}>
                                     {childMenu}
                                   </a>
                                   <ul className={this.state.value[key][subMenu][childMenu].isOpen ? "dropdown-menu show" : "dropdown-menu"}>
                                     {Object.keys(this.state.value[key][subMenu][childMenu]).map((leveltwoMenu, index) =>
                                      leveltwoMenu != "isOpen" && this.state.value[key][subMenu][childMenu][leveltwoMenu].pathName ? <li><Link to={this.state.value[key][subMenu][childMenu][leveltwoMenu].pathName} className="dropdown-item">{leveltwoMenu}</Link></li> :
                                      leveltwoMenu != "isOpen" && 
                                      <li className="nav-item dropdown"
                                      onMouseEnter={() => this.toggleOpen2(key,subMenu, childMenu, leveltwoMenu)}
                                      onMouseLeave={() => this.toggleClose2(key,subMenu, childMenu, leveltwoMenu)}
                                      >
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'black' }}>
                                          {leveltwoMenu}
                                        </a>
                                        <ul className={this.state.value[key][subMenu][childMenu][leveltwoMenu].isOpen ? "dropdown-menu show" : "dropdown-menu"}>
                                          {Object.keys(this.state.value[key][subMenu][childMenu][leveltwoMenu]).map((levelthreeMenu, index) =>
                                            levelthreeMenu != "isOpen" && this.state.value[key][subMenu][childMenu][leveltwoMenu][levelthreeMenu].pathName ? <li><Link to={this.state.value[key][subMenu][childMenu][leveltwoMenu][levelthreeMenu].pathName} className="dropdown-item">{levelthreeMenu}</Link></li> :
                                               
                                            console.log(levelthreeMenu) )}
                                        </ul>
                                      </li>)}
                                  
                                    
                                  </ul>
                                 </li>
                                     
                             )}
                          </ul>
                        </li>)
                      : ""}
                  </div>
                </div>)
          }
        </ul>
        <GetModal />
      </nav>
      
    </>
    )
  }
}
export default Header;