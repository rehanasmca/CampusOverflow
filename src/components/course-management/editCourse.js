import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './courses.module.css';
import { connect } from 'react-redux';
import { updateCourseValues, fetchCourses } from '../../redux/reducers/coursesReducer';
import * as Yup from 'yup';

class EditCourse extends React.Component {
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
        abbreviation: Yup.string()
            .min(3, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Required'),
        fees: Yup.string().required('Required'),
        metaKeyWords: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        metaDescription: Yup.string()
            .min(3, 'Too Short')
            .max(50, 'Too Long').required('Required'),
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
                            Edit Course{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validationSchema={this.validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                let courseData = {
                                    id: values.id? values.id : '',
                                    name: values.name ? values.name : '',
                                    abbreviation: values.abbreviation ? values.abbreviation : '',
                                    fees: values.fees ? values.fees : '',
                                    metaKeyWords: values.metaKeyWords ? values.metaKeyWords : '',
                                    metaDescription: values.metaDescription ? values.metaDescription : '',
                                    metaTitle: values.metaTitle ? values.metaTitle : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active ? values.active : false,
                                    deleted: values.deleted ? values.deleted : false,
                                }
                                setSubmitting(false);
                                this.props.updateCourseValues(courseData).then(res => {
                                    if (res.data) {
                                        this.props.fetchCourses();
                                        this.handleClose();
                                    } else {
                                        console.log(res)
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
                                        <Form.Label>Abbreviation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="abbreviation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.abbreviation} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.abbreviation && touched.abbreviation && errors.abbreviation}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Fees</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fees"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.fees} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.fees && touched.fees && errors.fees}
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
export default connect('', { updateCourseValues, fetchCourses })(EditCourse);