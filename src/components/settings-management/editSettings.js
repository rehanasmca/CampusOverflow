import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './settings.module.css';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { updateSettingsValues, fetchSettings } from '../../redux/reducers/settingsReducer';
class EditSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleClose = () => {
        this.props.onHide();
    }
    validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        value: Yup.string()
            .required('Required'),
        numberOfReTryes: Yup.number().required('Required'),
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
                            Edit Settings{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validationSchema={this.validationSchema}

                            onSubmit={(values, { setSubmitting }) => {
                                let settingValues = {
                                    id : values.id,
                                    name: values.name ? values.name : '',
                                    value:values.value ? values.value : '',
                                    numberOfReTryes: values.numberOfReTryes ? values.numberOfReTryes : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active ? values.active : '',
                                    deleted: values.deleted ? values.deleted : '' };
                                setSubmitting(false);
                                this.props.updateSettingsValues(settingValues).then(res => {
                                    if (res.data) {
                                        this.props.fetchSettings();
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
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.name && touched.name && errors.name}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="value"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.value} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.value && touched.value && errors.value}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Number Of ReTryes</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="numberOfReTryes"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.numberOfReTryes} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.numberOfReTryes && touched.numberOfReTryes && errors.numberOfReTryes}
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
export default connect('', { updateSettingsValues, fetchSettings })(EditSettings);