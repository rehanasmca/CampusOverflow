import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './countries.module.css';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { updateCountryValues, fetchCountries } from '../../redux/reducers/countriesReducer';
class EditCountries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
       
    }
    handleClose =()=>{
        this.props.onHide();
    }

    validationSchema = Yup.object().shape({
        countryName: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        metaKeyWords: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        metaDescription: Yup.string().required('Required')
            .min(3, 'Too short!').max(50, 'Too Long'),
        metaTitle: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required')
    });

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
                            validationSchema={this.validationSchema}
               
                            onSubmit={(values, { setSubmitting }) => {
                                let data ={
                                    id : values.id,
                                    countryName: values.countryName ? values.countryName : '',
                                    metaKeyWords: values.metaKeyWords ? values.metaKeyWords : '',
                                    metaDescription: values.metaDescription ? values.metaDescription : '',
                                    metaTitle: values.metaTitle ? values.metaTitle : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active,
                                    deleted: values.deleted
                                }
                                setSubmitting(false);
                                this.props.updateCountryValues(data).then(res => {
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
                                   <Form.Group controlId="formBasicEmail">
                            <Form.Label>Country Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="countryName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.countryName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.countryName && touched.countryName && errors.countryName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Meta KeyWords</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaKeyWords"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaKeyWords} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.metaKeyWords && touched.metaKeyWords && errors.metaKeyWords}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Meta Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaDescription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaDescription} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.metaDescription && touched.metaDescription && errors.metaDescription}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaTitle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaTitle} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.metaTitle && touched.metaTitle && errors.metaTitle}
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