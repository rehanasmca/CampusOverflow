import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './smsTemplate.module.css';
import { connect } from 'react-redux';
import { CreateNewSmsTemplate, fetchSMSTemplates } from '../../redux/reducers/smsTemplateReducer';
import { fetchRoles } from '../../redux/reducers/rolesReducer';
import * as Yup from 'yup';

import Trumbowyg from 'react-trumbowyg'

import 'react-trumbowyg/dist/trumbowyg.min.css'

class CreateSmsTemplate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
        name: "",
        sms: "",
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
        sms: Yup.string()
            .required('Required'),
        roleId: Yup.string()
            .required('Required')

    });

    componentDidMount() {
        this.props.fetchRoles();
    }
    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New Sms template</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateNewSmsTemplate(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchSMSTemplates();

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
                            <Form.Label>sms</Form.Label>
                            <Form.Control as="textarea"
                                name="sms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sms} className={Classes.formInput}
                                style={{ height: '100px' }}></Form.Control>
                            <Form.Text className="text-muted">
                                {errors.sms && touched.sms && errors.sms}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>
                    </Form>

                )}
            </Formik>
            <Trumbowyg
        buttons={
            [
                ['formatting'],
                'btnGrp-semantic',
                ['link'],
                ['insertImage'],
                'btnGrp-justify',
                'btnGrp-lists',
                ['fullscreen']
            ]
        }
        data='Hello, World!'
        placeholder='Type your text!'
        onChange={() => console.log('Change event fired')} 
    />
        </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        roles: state.roles ? state.roles : []

    }
};

export default connect(mapStateToProps, { CreateNewSmsTemplate, fetchSMSTemplates, fetchRoles })(CreateSmsTemplate);