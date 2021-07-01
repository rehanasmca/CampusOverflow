import React, { useState, useSelector, useEffect } from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Classes from './adduser.module.css';
import { Constants } from '../../constatnts';
import {connect} from 'react-redux';
import { PasswordRules } from '../../password-validations/adminPasswordValidations';
import {fetchRoles} from '../../redux/reducers/rolesReducer';

class Adduser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.validatePassword = this.validatePassword.bind(this)
    }

    componentDidMount(){
        this.props.fetchRoles();

    }
    initialValues = {
        userName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false,
        confirmPassword: '',
        roles: []
    };

 validatePassword = (p) => {
        let errors = [];
        if (p.length < PasswordRules.minNumberofChars) {
            errors.push("Your password must be at least 8 characters");
        }
        if (PasswordRules.smallAlphabet == 'yes') {
            if (p.search(/[a-z]/i) < 0) {
                errors.push("Your password must contain at least one letter.");
            }
        }
        if (PasswordRules.capitalAlphabet == 'yes') {
            if (p.search(/[A-Z]/i) < 0) {
                errors.push("Your password must contain at least one capital letter.");
            }
        }
        if (PasswordRules.number == 'yes') {
            if (p.search(/[0-9]/) < 0) {
                errors.push("Your password must contain at least one digit.");
            }
        }
        if (p.search(/.*[!@#$%^&*() =+_-]/) < 0) {
            errors.push("your password must contain one special character")
        }
        if (errors.length > 0) {
            // alert(errors.join("\n"));
            return [false, errors];
        }
        return true;
    }

 render() {
        return (<div className={Classes.maindiv}>
            <h1>User Registration form</h1>
            <Formik
                initialValues={this.initialValues}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.userName) {
                        errors.userName = 'Required'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (this.validatePassword(values.password)[0] == false) {
                        errors.password = this.validatePassword(values.password)[1].join("\n");
                    }
                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Required'
                    } else if(values.phoneNumber.length < 10 && values.phoneNumber.length > 10 ){
                        errors.phoneNumber= 'phone number should be 10 characters';
                    } else if(!/^[0-9]+$/i.test(values.phoneNumber)){
                        errors.phoneNumber = 'phone number should contain numbers only'
                    }
                    if (values.password != values.confirmPassword) {
                        errors.confirmPassword = 'Password and confirm password should same'
                    }
                    return errors;
                }}

                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    let token = JSON.parse(localStorage.getItem('userData'));
                    token = token.requestId;
                    const requestOptions = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    };
                    delete values.confirmPassword;
                    axios.post(Constants.testBaseUrl + '/Account/CreateUserMaster', values, { headers: requestOptions })
                        .then(response => {
                            if (response.data.data) {
                                setSubmitting(false);
                                alert("added user successfully");
                            } else if (response.data.error) {
                                alert(response.data.error);
                            }


                            console.log(response);

                        })

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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.email && touched.email && errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                            </Form.Text>
                        </Form.Group>
                        { this.props.roles.role ? this.props.roles.role.map((item, index) =>
                            <Form.Check
                                type='checkbox'
                                label={item.roleName}
                                id={item.id}
                                key={index}
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.roles.push(item.id);
                                    } else {
                                        var index = values.roles.indexOf(item.id);
                                        if (index > -1) {
                                            values.roles.splice(index, 1);
                                        }

                                    }

                                }}
                            />
                        ) : ""}
                        <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>
                    </Form>

                )}
            </Formik>

        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      login: state.login.accessToken ? state.login.accessToken : '',
      roles: state.roles ? state.roles :[]
      
    }
  };

export default connect(mapStateToProps,{fetchRoles})(Adduser);