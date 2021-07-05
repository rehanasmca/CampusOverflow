import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './email.module.css';
import { connect } from 'react-redux';

import { updateQueuedEmail,  fetchQueuedEmails} from '../../redux/reducers/emailReducer';
import * as Yup from 'yup';

class EditQueuedEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    handleClose = () => {
        this.props.onHide();
    }

    // validationSchema = Yup.object().shape({
    //     cityName: Yup.string()
    //         .min(3, 'Too Short!')
    //         .max(30, 'Too Long!')
    //         .required('Required'),
    //     countryId: Yup.string()
    //         .required('Required'),
    //     stateId: Yup.string().required('Required'),
    //     metaKeyWords: Yup.string()
    //         .min(3, 'Too Short')
    //         .max(30, 'Too Long').required('Required'),
    //     metaDescription: Yup.string()
    //         .min(3, 'Too Short')
    //         .max(50, 'Too Long').required('Required'),
    //     metaTitle: Yup.string()
    //         .min(3, 'Too Short')
    //         .max(30, 'Too Long').required('Required')

    // });

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
                            validate={values => {
                                const errors = {};
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                
                                setSubmitting(false);
                                this.props.updateQueuedEmail(values).then(res => {
                                    if (res.data) {
                                        this.props.fetchQueuedEmails();
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
                                        <Form.Label>send on Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="sentOnDate"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.sentOnDate} className={Classes.formInput} />
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
      login: state.login.accessToken ? state.login.accessToken : [],
      countries: state.countries ? state.countries :[],
      states: state.states ? state.states :[] 
      
    }
  };

export default connect(mapStateToProps, { updateQueuedEmail,  fetchQueuedEmails })(EditQueuedEmail);