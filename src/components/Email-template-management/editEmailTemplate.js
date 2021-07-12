import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './emailTemplate.module.css';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/reducers/usersReducer';
import { fetchRoles } from '../../redux/reducers/rolesReducer';
import * as Yup from 'yup';

import { updateTemplate, fetchEmailTemplates } from '../../redux/reducers/emailTemplateReducer';
class EditEmailTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleClose = () => {
        this.props.onHide();
    }


    componentDidMount() {
        // this.props.fetchSMSTemplates();
        // this.props.fetchUsers()
    }

    validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        body: Yup.string()
            .required('Required'),
        subject: Yup.string().required('Required'),
        roleId: Yup.string()
            .required('Required')

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
                            Edit SMS{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validationSchema={this.validationSchema}

                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false);
                                let data = {
                                    id: values.id,
                                    name: values.name ? values.name : '',
                                    body: values.body ? values.body : '',
                                    subject: values.subject ? values.subject : '',
                                    roleId: values.roleId ? values.roleId : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active,
                                    deleted: values.deleted
                                }
                                this.props.updateTemplate(data).then(res => {
                                    if (res.data) {
                                        this.props.fetchEmailTemplates();
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
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="subject"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.subject} className={Classes.formInput} />
                                        <Form.Text className="text-muted">
                                            {errors.subject && touched.subject && errors.subject}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Role Id</Form.Label>
                                        <Form.Control as="select"
                                            name="roleId"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.roleId} className={Classes.formInput}>
                                            {this.props.roles.roles ? this.props.roles.roles.map((item, index) => <option value={item.id}>{item.roleName}</option>) : ''}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            {errors.roleId && touched.roleId && errors.roleId}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>State Id</Form.Label>
                                        <Form.Control as="textarea"
                                            name="body"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.body} className={Classes.formInput}
                                            style={{ height: '100px' }}></Form.Control>
                                        <Form.Text className="text-muted">
                                            {errors.body && touched.body && errors.body}
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
        smsTemplates: state.smsTemplates ? state.smsTemplates : [],
        roles: state.roles ? state.roles : ''
    }
}

export default connect(mapStateToProps, { updateTemplate, fetchUsers,fetchEmailTemplates, fetchRoles })(EditEmailTemplate);