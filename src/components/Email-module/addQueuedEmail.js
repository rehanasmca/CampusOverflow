import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './email.module.css';
import { connect } from 'react-redux';
import { CreateQueuedEmail, fetchQueuedEmails } from '../../redux/reducers/emailReducer';
import * as Yup from 'yup';

class AddQueuedEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
        from: "",
        fromName: "",
        to: "",
        toName: "",
        replyTo: "",
        replyToName: "",
        cc: "",
        bcc: "",
        subject: "",
        priorityId: 0,
        body: "",
        attechmentFilePath: "",
        attechmentFileName: "",
        dontSendBeforeDate: "",
        sentTrys: 0,
        sentOnDate: "",
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false
    };

    validationSchema = Yup.object().shape({
        from: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        fromName: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        to: Yup.string()
            .min(3, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required'),
        toName: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        replyTo: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        replyToName: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        cc: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        bcc: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        subject: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        priorityId: Yup.number()
            .required('Required'),
        body: Yup.string()
            .min(3, 'Too Short')
            .max(100, 'Too Long').required('Required'),
        attechmentFilePath: Yup.string()
            .required('Required'),
        attechmentFileName: Yup.string()
            .min(3, 'Too Short')
            .max(50, 'Too Long').required('Required'),
        dontSendBeforeDate: Yup.string()
            .min(3, 'Too Short')
            .max(50, 'Too Long').required('Required'),
        sentTrys: Yup.number()
            .required('Required'),
        sentOnDate: Yup.string()
            .min(3, 'Too Short')
            .max(50, 'Too Long').required('Required')
    });

    
    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New Queued email form</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateQueuedEmail(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchQueuedEmails();

                        } else {
                            console.log("error");
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
                }) => (

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                type="text"
                                name="from"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.from} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.from && touched.from && errors.from}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>From Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fromName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fromName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.fromName && touched.fromName && errors.fromName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="text"
                                name="to"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.to} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.to && touched.to && errors.to}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>To Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="toName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.toName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.toName && touched.toName && errors.toName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Reply To</Form.Label>
                            <Form.Control
                                type="text"
                                name="replyTo"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.replyTo} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.replyTo && touched.replyTo && errors.replyTo}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Reply To Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="replyToName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.replyToName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.replyToName && touched.replyToName && errors.replyToName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>cc</Form.Label>
                            <Form.Control
                                type="text"
                                name="cc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cc} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.cc && touched.cc && errors.cc}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Bcc</Form.Label>
                            <Form.Control
                                type="text"
                                name="bcc"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.bcc} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.bcc && touched.bcc && errors.bcc}
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
                            <Form.Label>Priority Id</Form.Label>
                            <Form.Control
                                type="text"
                                name="priorityId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.priorityId} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.priorityId && touched.priorityId && errors.priorityId}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                type="text"
                                name="body"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.body} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.body && touched.body && errors.body}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Attechment File Path</Form.Label>
                            <Form.Control
                                type="file"
                                name="attechmentFilePath"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.attechmentFilePath} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.attechmentFilePath && touched.attechmentFilePath && errors.attechmentFilePath}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Attechment File Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="attechmentFileName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.attechmentFileName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.attechmentFileName && touched.attechmentFileName && errors.attechmentFileName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Dont Send Before Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="dontSendBeforeDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.dontSendBeforeDate} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.dontSendBeforeDate && touched.dontSendBeforeDate && errors.dontSendBeforeDate}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Sent Trys</Form.Label>
                            <Form.Control
                                type="text"
                                name="sentTrys"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sentTrys} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.sentTrys && touched.sentTrys && errors.sentTrys}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Sent On Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="sentOnDate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sentOnDate} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.sentOnDate && touched.sentOnDate && errors.sentOnDate}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>
                    </Form>

                )}
            </Formik>

        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        login: state.login.accessToken ? state.login.accessToken : [],
        countries: state.countries ? state.countries : [],
        states: state.states ? state.states : []

    }
};

export default connect(mapStateToProps, { CreateQueuedEmail, fetchQueuedEmails})(AddQueuedEmail);