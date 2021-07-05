import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './email.module.css';
import { connect } from 'react-redux';
import { PasswordRules } from '../../password-validations/adminPasswordValidations';

import { updateEmail, fetchQueuedEmails } from '../../redux/reducers/emailReducer';
class EditEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
       console.log("email")
    }
    handleClose =()=>{
        this.props.onHide();
    }

    // to validate password
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
                            Edit Country{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
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
            
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                this.props.updateEmail(values).then(res => {
                                    if (res.data) {
                                        this.props.fetchQueuedEmails();
                                        this.handleClose();
                                    } else {
                                        console.log("error")
                                    }
                                });

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
export default connect('', { updateEmail, fetchQueuedEmails })(EditEmail);