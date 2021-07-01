import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux'
import axios from 'axios';
import { Constants } from '../../constatnts';
import Classes from './login.module.css';
import { Formik } from 'formik';
import {loginUser} from '../../redux/reducers/loginReducer';
class Login extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = { username: '', password: '', modalShow: 'false' }
         }

    render() {
const initialValues = {userName : '', password: ''}
        return (
            <div className={Classes.maindiv} >
                <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.userName) {
                    errors.userName = 'Required'
                }
                if (!values.password) {
                    errors.password = 'Required'
                } 
                return errors;
            }}

            // when submit form
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                // axios.post(Constants.testBaseUrl + "/Account/login", values
                // ).then(response => {
                //     console.log(response.data.data);
                //     let res = response.data.data;
                //     let res1 = response.data;
                //     console.log(typeof (res))
                //     localStorage.setItem('userData', JSON.stringify(res1));
                //     this.props.login(JSON.stringify(res));
                // });
                this.props.loginUser(values);
                setSubmitting(false);
                this.props.onHide();
                this.props.history.push("/home");
            
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="string"
                            name="userName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userName} className={Classes.formInput} />
                        <Form.Text className="text-muted">
                            {errors.userName && touched.userName && errors.userName}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} className={Classes.formInput} />
                        <Form.Text className="text-muted">
                            {errors.password && touched.password && errors.password}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" disabled={isSubmitting} variant="primary">Login</Button>
                </Form>
            )}
        </Formik>

            </div>
        );
    }
}

export default connect('', {loginUser})(Login);