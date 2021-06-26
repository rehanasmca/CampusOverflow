import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoginModal from './loginModal';
import axios from 'axios';
class Login extends React.Component {
    
    constructor(props) {
        console.log(props)
        super(props);
        this.state = { username: '', password: '', modalShow: 'false' }
        this.handleChangeEvents = this.handleChangeEvents.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmitevents = this.handleSubmitevents.bind(this);
    }
    handleChangeEvents(event) {
        this.setState({ username: event.target.value });
    }
    handleSubmitevents(event) {
       
        event.preventDefault();
        console.log(this.state);
        console.log(this.state);
        const data ={
            "userName": "test",
            "password": "test"
          }
        localStorage.setItem('userData', JSON.stringify(data));
        axios.post('https://cors-anywhere.herokuapp.com/https://7026269f2602.ngrok.io/Account/login ',data
        )
        .then(response => console.log(response));

        
        this.props.onHide();
        this.props.history.push("/home");
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value })
    }
    render() {
        
        return (
            <div style={{width: '300px', margin: '50px'}}>
                <Form onSubmit={
                    this.handleSubmitevents
                   
                    } >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="string"
                            name="userName"
                            onChange={this.handleChangeEvents}
                            value={this.state.username} />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={this.handlePasswordChange}
                            value={this.state.password} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Login</Button>
                </Form>
               
               
            </div>
        );
    }
}

export default Login;