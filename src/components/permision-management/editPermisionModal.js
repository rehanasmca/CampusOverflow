import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Classes from './permissions.module.css';
import { useSelector } from 'react-redux';
import { Constants } from '../../constatnts';


const EditPermision = (props) => {
    console.log(props.values);
    const users = useSelector((state) => state);

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Permission{props.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={props.values}
                        validate={values => {
                            const errors = {};
                            if (!values.permissionName) {
                                errors.permissionName = 'Required';
                            } 
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            let token = users.login.accessToken;
                            const requestOptions = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            };
                            axios.post(Constants.testBaseUrl + '/Account/UpdatePermissionMaster', values, { headers: requestOptions })
                                .then(response => {
                                    if (response.data.data) {
                                        setSubmitting(false);
                                        alert("changed user detsils successfully");
                                        props.onHide();
                                    } else if (response.data.error) {
                                        alert(response.data.error);
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
                                    <Form.Label>Permission Name</Form.Label>
                                    <Form.Control
                                        type="string"
                                        name="permissionName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.permissionName} className={Classes.formInput} />
                                    <Form.Text className="text-muted">
                                        {errors.permissionName && touched.permissionName && errors.permissionName}
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

export default EditPermision;