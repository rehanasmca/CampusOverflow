import React,{Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit, faSign, faRegistered} from '@fortawesome/free-solid-svg-icons';
import ToastMessage from './ToastMessage';
import axios from 'axios';

class LoginComponent extends Component{

    constructor(props){
      super(props);
      this.state=this.initialState;
      this.state.login=false;
      this.state.register=false;
      this.authenticate = this.authenticate.bind(this);
      this.dataChanged = this.dataChanged.bind(this);
    }

    initialState = {
      register: false, userName:'', password:''
    };

    //This function is used to save the Books.......
    authenticate = event =>{
      event.preventDefault();

      const auth ={
        userName: this.state.userName,
        password: this.state.password
      };
      
      axios.post("http://localhost:8080/isAuthenticated",auth)
      .then(response => response.data.data.status)
      .then(status => {
        if(status !== null && status !== "Failure"){
          this.setState({"login": true, "linkType":"save"});
          setTimeout(()=> this.setState({'login':true}), 2000);
          this.props.history.push("");
        }
        else{
          this.setState({"login": false});
        }
      });
      this.setState(() => this.initialState);
    };

    dataChanged = event =>{
      this.setState({
        [event.target.name]:event.target.value
      });
    };

    //Links to the book List Page.........
    register = () =>{
      //return this.props.history.push("/list");
      this.setState({"register":true});
    };

    registerUser =(event)=>{
        
      event.preventDefault();

      const auth ={
        userName: this.state.userName,
        password: this.state.password
      };
      
      axios.post("http://localhost:8080/isAuthenticated",auth)
      .then(response => response.data.data.status)
      .then(status => {
        if(status !== null && status !== "Failure"){
          this.setState({"login": true, "linkType":"save"});
          setTimeout(()=> this.setState({'login':true}), 2000);
          this.props.history.push("");
        }
        else{
          this.setState({"login": false});
        }
      });
      this.setState(() => this.initialState);
    
    };

    render=()=>{
        const{userName, password}=this.state;

        return <div className="bg-dark text-white">
        <h1>{"Login / Register"}</h1>
        <div style={{"display":this.state.login ? "block" : "none"}}>
          <ToastMessage show= {this.state.login} message= {"Logged In Successfully."} type={"success"}/>
        </div>
        <Card className="border border-dark bg-dark text-white center">
          <Card.Header><FontAwesomeIcon icon={this.state.register ? faEdit : faPlusSquare} />{this.state.register ? "Register your credentials":"Login with your credentials"}</Card.Header>
          <Form id="bookFormId" onSubmit={this.authenticate} onReset={this.register}>
          <Card.Body> 
              <Form.Row>
                <Form.Group as={Col} controlId="formGridUser">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="userName" type="test" 
                  value={userName}
                  onChange={this.dataChanged}
                  placeholder="Enter User Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="password" type="password" 
                  value={password}
                  onChange={this.dataChanged}
                  placeholder="Enter Password" />
                </Form.Group>
              </Form.Row>
          </Card.Body>
          <Card.Footer style={{"textAlign":"right", "display":this.state.register ? "none" : "block"}}>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faSign}/> {"Login"}
            </Button>{' '}
            <Button variant="info" type="reset">
              <FontAwesomeIcon icon={faRegistered} /> Register
            </Button>
          </Card.Footer>
          <Card.Footer style={{"textAlign":"right", "display":this.state.register ? "block" : "none"}}>
            <Button variant="info" type="button" onClick={this.registerUser.bind()}>
                <FontAwesomeIcon icon={faRegistered} /> Register
                </Button>
          </Card.Footer>
          </Form>
        </Card>
      </div>
    }
}

export default LoginComponent;