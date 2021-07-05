import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './sms.module.css';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/reducers/usersReducer';
import { fetchSMSTemplates } from '../../redux/reducers/smsTemplateReducer';
import { CreateSms, fetchSMS } from '../../redux/reducers/smsRducer';
import * as Yup from 'yup';

class AddSms extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
        userId: 1,
        smsTemplateId: 1,
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false
    };

    validationSchema = Yup.object().shape({
        userId: Yup.string()
            .required('Required'),
        smsTemplateId: Yup.string()
            .required('Required'),

    });

    componentDidMount() {
        this.props.fetchSMSTemplates();
        this.props.fetchUsers()
    }
    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New SMS form</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateSms(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchSMS();

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
        users: state.users ? state.users : [],
        smsTemplates: state.smsTemplates ? state.smsTemplates : []
    }
}

export default connect(mapStateToProps, { CreateSms, fetchSMSTemplates, fetchUsers, fetchSMS })(AddSms);