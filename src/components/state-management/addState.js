import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './states.module.css';
import { connect } from 'react-redux';
import { fetchCountries } from '../../redux/reducers/countriesReducer';
import { fetchStates, CreateNewState } from '../../redux/reducers/statesReducer';
import * as Yup from 'yup';

class AddState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    initialValues = {
            stateName: "",
            countryId: 1,
            metaKeyWords: "",
            metaDescription: "",
            metaTitle: "",
            dateInserted: new Date(),
            dateUpdated: new Date(),
            active: true,
            deleted: false
    };

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
    
    componentDidMount(){
        this.props.fetchCountries();
    }


    render() {
        return (<div className={Classes.maindiv}>
            <h1>Add New State form</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    this.props.CreateNewState(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            this.props.fetchStates();
                        } else {
                            console.log(res);
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
      countries: state.countries ? state.countries :[],
      states: state.states ? state.states :[] 
      
    }
  };
export default connect(mapStateToProps, { fetchStates, CreateNewState, fetchCountries })(AddState);