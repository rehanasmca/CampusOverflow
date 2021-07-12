import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './emailTemplate.module.css';
import { connect } from 'react-redux';
import { CreateNewTemplate, fetchEmailTemplates } from '../../redux/reducers/emailTemplateReducer';
import { fetchRoles } from '../../redux/reducers/rolesReducer';
import * as Yup from 'yup';

class CreateEmailTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
        name: "",
        body: "",
        subject: "",
        roleId: 1,
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false
    };

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

    componentDidMount() {
        this.props.fetchRoles();
    }
    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New Email template</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateNewTemplate(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchEmailTemplates();

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
        roles: state.roles ? state.roles : []

    }
};

export default connect(mapStateToProps, { CreateNewTemplate, fetchEmailTemplates, fetchRoles })(CreateEmailTemplate);