import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './states.module.css';
import { connect } from 'react-redux';
import { updateState, fetchStates } from '../../redux/reducers/statesReducer';
import * as Yup from 'yup';

class EditState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleClose = () => {
        this.props.onHide();
    }

    validationSchema = Yup.object().shape({
        stateName: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        countryId: Yup.string()
            .required('Required'),
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
                                    id: values.id ? values.id : '',
                                    stateName: values.stateName ? values.stateName : '',
                                    countryId: values.countryId ? values.countryId : '',
                                    metaKeyWords: values.metaKeyWords ? values.metaKeyWords : '',
                                    metaDescription: values.metaDescription ? values.metaDescription : '',
                                    metaTitle: values.metaTitle ? values.metaTitle : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active,
                                    deleted: values.deleted,
                                }
                                setSubmitting(false);
                                this.props.updateState(courseData).then(res => {
                                    if (res.data) {
                                        this.props.fetchStates();
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
                                        <Form.Label>State Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="stateName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.stateName} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.stateName && touched.stateName && errors.stateName}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Country Id</Form.Label>
                                        <Form.Control as="select"
                                            name="countryId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.countryId} className={Classes.formInput}>
                                            {this.props.countries.countries ? this.props.countries.countries.map((item, index) => <option value={item.id}>{item.countryName}</option>) : ''}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            {errors.countryId && touched.countryId && errors.countryId}
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

const mapStateToProps = state => {
    return {
      countries: state.countries ? state.countries :[],
     
    }
  };
export default connect(mapStateToProps, { updateState, fetchStates })(EditState);