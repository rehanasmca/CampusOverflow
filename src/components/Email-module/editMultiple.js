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
class EditMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClose =()=>{
        this.props.onHide();
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
                            Edit multiple emails
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{sendOnDate : ''}}
                            validate={values => {
                                const errors = {};
                                if (!values.sendOnDate) {
                                    errors.sendOnDate = 'Required';
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
                            <Form.Label>Send on date</Form.Label>
                            <Form.Control
                                type="date"
                                name="sendOnDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sendOnDate} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.sendOnDate && touched.sendOnDate && errors.sendOnDate}
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
export default connect('', { updateEmail, fetchQueuedEmails })(EditMultiple);