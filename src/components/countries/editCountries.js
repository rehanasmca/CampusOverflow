import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './countries.module.css';
import { connect } from 'react-redux';
import { updateCountryValues, fetchCountries } from '../../redux/reducers/countriesReducer';
class EditCountries extends React.Component {
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
                            Edit Country{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validate={values => {
                                const errors = {};

                                if (!values.countryName) {
                                    errors.countryName = 'Required'
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                this.props.updateCountryValues(values).then(res => {
                                    if (res.data) {
                                        this.props.fetchCountries();
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
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Country Name</Form.Label>
                                        <Form.Control
                                            type="string"
                                            name="countryName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.countryName} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.countryName && touched.countryName && errors.countryName}
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
export default connect('', { updateCountryValues, fetchCountries })(EditCountries);