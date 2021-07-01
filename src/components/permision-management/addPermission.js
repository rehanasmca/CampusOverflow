import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Classes from './permissions.module.css';
import { Constants } from '../../constatnts';
import { useSelector } from 'react-redux';
const initialValues = {
    permissionName: '',
    dateInserted: new Date(),
    dateUpdated: new Date(),
    active: true,
    deleted: false
};

const AddPermission = () => {
    const users = useSelector((state) => state);
    return(
    <div className={Classes.maindiv}>
        <h1>Add New permission form</h1>
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.permissionName) {
                    errors.permissionName = 'Required';
                } 
                return errors;
            }}

            // when submit form
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                let t =JSON.parse(localStorage.getItem("userData"))
                let token = t.accessToken;
                 
                const requestOptions = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                };
               
                axios.post(Constants.testBaseUrl + '/Account/CreatePermissionMaster', values, { headers: requestOptions })
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
                    
                    <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>
                </Form>

            )}
        </Formik>

    </div>
);
            }
export default AddPermission;