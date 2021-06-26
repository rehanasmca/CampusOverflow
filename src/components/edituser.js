import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
const Edituser = () => (
    <div>
        <h1>Edit User details form</h1>
        <Formik
            initialValues={{ userName: '', email: '', password: '', phoneNumber: '', dateInserted: new Date(), dateUpdated: new Date(), active: true, deleted: false }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if(!values.userName){
                    errors.userName = 'Required'
                }
                if(!values.password){
                    errors.password = 'Required'
                }
                if(!values.phoneNumber){
                    errors.phoneNumber = 'Required'
                }
                if(!values.dateInserted){
                    errors.dateInserted = 'Required'
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                };
                fetch('https://cors-anywhere.herokuapp.com/https://ca546bbbb10d.ngrok.io/swagger/index.html/Account/CreateUserMaster', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setSubmitting(false);
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
                            value={values.userName} style={{width: '250px'}} />
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
                            value={values.email} style={{width: '250px'}} />
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
                            value={values.phoneNumber} style={{width: '250px'}} />
                        <Form.Text className="text-muted">
                            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                        </Form.Text>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Date Inserted</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateInserted"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dateInserted} style={{width: '250px'}} />
                        <Form.Text className="text-muted">
                            {errors.dateInserted && touched.dateInserted && errors.dateInserted}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Date Updated</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateUpdated"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.dateUpdated} style={{width: '250px'}} />
                        <Form.Text className="text-muted">
                            {errors.dateUpdated && touched.dateUpdated && errors.dateUpdated}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password} style={{width: '250px'}} />
                        <Form.Text className="text-muted">
                            {errors.password && touched.password && errors.password}
                        </Form.Text>
                    </Form.Group>
                  
                    
                    {/* <button type="submit" variant="primary" disabled={isSubmitting} style={{color: 'black', display: 'block'}}>
             Submit
           </button> */}

                    <Button type="submit" disabled={isSubmitting} variant="primary">Submit</Button>
                </Form>

            )}
        </Formik>

    </div>
);

export default Edituser;