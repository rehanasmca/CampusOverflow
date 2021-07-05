import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './sms.module.css';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/reducers/usersReducer';
import { fetchSMSTemplates } from '../../redux/reducers/smsTemplateReducer';
import { updateSMS, fetchSMS } from '../../redux/reducers/smsRducer';
class EditSMS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("email")
    }
    handleClose = () => {
        this.props.onHide();
    }


    componentDidMount() {
        this.props.fetchSMSTemplates();
        this.props.fetchUsers()
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
                            Edit SMS{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validate={values => {
                                const errors = {};
                                if (!values.userId) {
                                    errors.userId = 'Required';
                                }
                                if (!values.smsTemplateId) {
                                    errors.smsTemplateId = 'Required'
                                }

                                return errors;
                            }}

                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                let data = {
                                    userId: values.userId ? values.userId : '',
                                    smsTemplateId: values.smsTemplateId ? values.smsTemplateId : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active,
                                    deleted: values.deleted
                                }
                                this.props.updateSMS(data).then(res => {
                                    if (res.data) {
                                        this.props.fetchSMS();
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
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control as="select"
                                            name="stateId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.userId} className={Classes.formInput}>
                                            {this.props.users.users.lstData ? this.props.users.users.lstData.map((item, index) => <option value={item.id}>{item.userName}</option>) : ''}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            {errors.userId && touched.userId && errors.userId}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Sms Template Id</Form.Label>
                                        <Form.Control as="select"
                                            name="smsTemplateId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.smsTemplateId} className={Classes.formInput}>
                                            {this.props.smsTemplates.smsTemplates ? this.props.smsTemplates.smsTemplates.map((item, index) => <option value={item.id}>{item.name}</option>) : ''}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            {errors.smsTemplateId && touched.smsTemplateId && errors.smsTemplateId}
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
        users: state.users ? state.users : [],
        smsTemplates: state.smsTemplates ? state.smsTemplates : []
    }
}

export default connect(mapStateToProps, { updateSMS, fetchSMSTemplates, fetchUsers, fetchSMS })(EditSMS);