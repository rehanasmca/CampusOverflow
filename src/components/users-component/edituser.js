import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './adduser.module.css';
import { PasswordRules } from '../../password-validations/adminPasswordValidations';
import { connect} from 'react-redux';
import {updateUserValues, fetchUsers} from '../../redux/reducers/usersReducer';
class Edituser extends React.Component {
    constructor(props){
        super(props);
        this.state= {};
        this.validatePassword = this.validatePassword.bind(this);
        console.log(props);
    }

initialValues = {
    // userName: this.props.values.userName,
    // email: this.props.values.email,
    // password: this.props.values.password,
    // phoneNumber: this.props.values.phoneNumber,
    // dateInserted: new Date(),
    // dateUpdated: new Date(),
    // active: true,
    // deleted: false,
    // confirmPassword: '',
    // roles: []
}
// validate password
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


render(){

    return (
        <div>
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit User{this.props.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            userName: this.props.values ? this.props.values.userName : '',
                            email: this.props.values ? this.props.values.email : '',
                            password: this.props.values ? this.props.values.password : '',
                            phoneNumber: this.props.values ? this.props.values.phoneNumber : '',
                        }}
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
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                              setSubmitting(false);
                              this.props.updateUserValues(values);
                              this.props.fetchUsers();
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
                                <Form.Group controlId="formBasicName">
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
                                <Form.Group controlId="formBasicPhoneNumber">
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

                                <Form.Group controlId="formBasicPassword">
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
                                <Button type="submit" disabled={isSubmitting} variant="primary">Submit</Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

        </div>
    )
}
}

const mapStateToProps = state => {
    return {
      login: state.login.accessToken ? state.login.accessToken : [],
      users: state.users ? state.users :[]
      
    }
  };

export default connect(mapStateToProps, {updateUserValues, fetchUsers})(Edituser);