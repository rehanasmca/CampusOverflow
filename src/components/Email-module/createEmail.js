import React, { useState, useSelector, useEffect } from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Classes from './email.module.css';
import { Constants } from '../../constatnts';
import {connect} from 'react-redux';
import { PasswordRules } from '../../password-validations/adminPasswordValidations';
import {CreateEmail} from '../../redux/reducers/emailReducer';

class AddEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.validatePassword = this.validatePassword.bind(this)
    }

  
    initialValues = {
        displayName: "",
        email: "",
        host: "",
        userName: "",
        password: "",
        port: 0,
        enableSSL: true,
        useDefaultCredential: true,
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false
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
            <h1>Create Email </h1>
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
                    if (!values.displayName) {
                        errors.displayName = 'Required'
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (this.validatePassword(values.password)[0] == false) {
                        errors.password = this.validatePassword(values.password)[1].join("\n");
                    }
                    if (!values.userName) {
                        errors.userName = 'Required'
                    }
                    if (values.password != values.confirmPassword) {
                        errors.confirmPassword = 'Password and confirm password should same'
                    }
                    if (!values.host) {
                        errors.host = 'Required'
                    }
                    if (!values.port) {
                        errors.port = 'Required'
                    }
                    if (!values.enableSSL) {
                        errors.enableSSL = 'Required'
                    }
                    if (!values.useDefaultCredential) {
                        errors.useDefaultCredential = 'Required'
                    }
                    return errors;
                }}

                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    
                    delete values.confirmPassword;
                    this.props.CreateEmail(values).then(res =>{
                        if(res.data){
                            console.log(res)

                        }
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
                            <Form.Label>Display Name</Form.Label>
                            <Form.Control
                                type="string"
                                name="displayName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.displayName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.displayName && touched.displayName && errors.displayName}
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
                            <Form.Label>Host</Form.Label>
                            <Form.Control
                                type="text"
                                name="host"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.host} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.host && touched.host && errors.host}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Port</Form.Label>
                            <Form.Control
                                type="text"
                                name="port"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.port} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.port && touched.port && errors.port}
                            </Form.Text>
                        </Form.Group> 
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Enable SSL</Form.Label>
                            <Form.Check
                            checked={values.enableSSL ? true : false}
                                type='radio'
                                label='true'
                                id='1'
                                key='1'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.enableSSL = true;
                                    }
                                }}
                            />
                             <Form.Check
                             checked={!values.enableSSL ? true : false}
                                type='radio'
                                label='False'
                                id='2'
                                key='2'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.enableSSL = false;
                                    }
                                }}
                            />
                             <Form.Text className="text-muted">
                                {errors.enableSSL && touched.enableSSL && errors.enableSSL}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Use Default Credential</Form.Label>
                            <Form.Check
                            checked={values.useDefaultCredential ? true : false}
                                type='radio'
                                label='true'
                                id='1'
                                key='1'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.useDefaultCredential = true;
                                    }
                                }}
                            />
                             <Form.Check
                             checked={!values.useDefaultCredential ? true : false}
                                type='radio'
                                label='False'
                                id='2'
                                key='2'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.useDefaultCredential = false;
                                    }
                                }}
                            />
                             <Form.Text className="text-muted">
                                {errors.useDefaultCredential && touched.useDefaultCredential && errors.useDefaultCredential}
                            </Form.Text>
                        </Form.Group>
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
     
    }
  };

export default connect(mapStateToProps,{CreateEmail})(AddEmail);