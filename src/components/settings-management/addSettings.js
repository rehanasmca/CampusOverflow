import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './settings.module.css';
import { connect } from 'react-redux';
import { fetchSettings, CreateNewSetting } from '../../redux/reducers/settingsReducer';
import * as Yup from 'yup';

class AddSettings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
        name: "",
        value: "",
        numberOfReTryes: 0,
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
        value: Yup.string()
            .required('Required'),
        numberOfReTryes: Yup.number().required('Required'),
    });


    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New University form</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateNewSetting(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchSettings();
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
        settings: state.settings ? state.settings : []

    }
};
export default connect(mapStateToProps, { fetchSettings, CreateNewSetting })(AddSettings);