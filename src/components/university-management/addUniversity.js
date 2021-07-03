import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Classes from './university.module.css';
import { connect } from 'react-redux';
import { fetchCountries } from '../../redux/reducers/countriesReducer';
import {CreateNewUniversity} from '../../redux/reducers/universityReducer';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddUniversity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        console.log(this.props)
    }


    initialValues = {
        universityName: "",
        countryId: 0,
        universityTypeId: 0,
        establishedYear: "",
        universityLink: "",
        isRecommended: true,
        isFeatured: true,
        metaKeyWords: "",
        metaDescription: "",
        metaTitle: "",
        dateInserted: new Date(),
        dateUpdated: new Date(),
        active: true,
        deleted: false
    };

    validationSchema = Yup.object().shape({
        universityName: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        countryId: Yup.number()
            .required('Required'),
        universityTypeId: Yup.number().required('Required'),
        establishedYear: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        universityLink: Yup.string()
            .min(3, 'Too Short')
            .max(100, 'Too Long').required('Required'),
        isRecommended: Yup.boolean()
            .required('Required'),
        isFeatured: Yup.boolean()
            .required('Required'),
        metaKeyWords: Yup.string()
            .min(3, 'Too Short')
            .max(30, 'Too Long').required('Required'),
        metaDescription: Yup.string()
            .min(3, 'Too Short')
            .max(100, 'Too Long').required('Required'),
        metaTitle: Yup.string()
            .min(3, 'Too Short')
            .max(100, 'Too Long').required('Required'),
    });

    componentDidMount(){
        this.props.fetchCountries();
    }

    render() {
        return (<div className={Classes.maindiv}>
            <h1>Create New University form</h1>
            <Formik
                initialValues={this.initialValues}
                validationSchema={this.validationSchema}
                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    this.props.CreateNewUniversity(values).then(res => {
                        if (res.data) {
                            setSubmitting(false);
                            toast("Wow so easy!");
                            this.props.fetchCountries();
                        } else {
                            toast(res.body);
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
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>University Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="universityName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityName}  />
                            <Form.Text className="text-muted">
                                {errors.universityName && touched.universityName && errors.universityName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1" className={Classes.formInput}>
                            <Form.Label>Select country</Form.Label>
                            <Form.Control as="select"
                            name="countryId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.countryId} >
                                {this.props.countries.countries ? this.props.countries.countries.map((item,index)=> <option value={item.id}
                                onClick={(e)=>{
                                    console.log(e.target.value);
                                    values.countryId = item.id
                                }}>{item.countryName}</option>) : ''}
                            </Form.Control>
                            <Form.Text className="text-muted">
                                {errors.countryId && touched.countryId && errors.countryId}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>University Type Id</Form.Label>
                            <Form.Control
                                type="number"
                                name="universityTypeId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityTypeId} />
                            <Form.Text className="text-muted">
                                {errors.universityTypeId && touched.universityTypeId && errors.universityTypeId}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>Established Year</Form.Label>
                            <Form.Control
                                type="date"
                                name="establishedYear"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.establishedYear} />
                            <Form.Text className="text-muted">
                                {errors.establishedYear && touched.establishedYear && errors.establishedYear}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>University Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="universityLink"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityLink} />
                            <Form.Text className="text-muted">
                                {errors.universityLink && touched.universityLink && errors.universityLink}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>Is Recommended</Form.Label>
                            <Form.Check
                            checked={values.isRecommended ? true : false}
                                type='radio'
                                label='true'
                                id='1'
                                key='1'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.isRecommended = true;
                                    }
                                }}
                            />
                             <Form.Check
                              checked={!values.isRecommended ? true : false}
                                type='radio'
                                label='False'
                                id='2'
                                key='2'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.isRecommended = false;
                                    }
                                }}
                            />
                             <Form.Text className="text-muted">
                                {errors.isFeatured && touched.isFeatured && errors.isFeatured}
                            </Form.Text>
                        </Form.Group> 
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Is Featured</Form.Label>
                            <Form.Check
                            checked={values.isFeatured ? true : false}
                                type='radio'
                                label='true'
                                id='1'
                                key='1'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.isFeatured = true;
                                    }
                                }}
                            />
                             <Form.Check
                             checked={!values.isFeatured ? true : false}
                                type='radio'
                                label='False'
                                id='2'
                                key='2'
                                onChange={(event) => {
                                    if (event.target.checked == true) {
                                        values.isFeatured = false;
                                    }
                                }}
                            />
                             <Form.Text className="text-muted">
                                {errors.isFeatured && touched.isFeatured && errors.isFeatured}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>Meta Key words</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaKeyWords"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaKeyWords}  />
                            <Form.Text className="text-muted">
                                {errors.metaKeyWords && touched.metaKeyWords && errors.metaKeyWords}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>Meta Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaDescription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaDescription}  />
                            <Form.Text className="text-muted">
                                {errors.metaDescription && touched.metaDescription && errors.metaDescription}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className={Classes.formInput}>
                            <Form.Label>Meta Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="metaTitle"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.metaTitle}/>
                            <Form.Text className="text-muted">
                                {errors.metaTitle && touched.metaTitle && errors.metaTitle}
                            </Form.Text>
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting} variant="primary">Save</Button>
                    </Form>

                )}
            </Formik>
            <ToastContainer />
        </div>
        
        );
    }
}

const mapStateToProps = state => {
    return {
      login: state.login.accessToken ? state.login.accessToken : [],
      countries: state.countries ? state.countries :[]
      
    }
  };
export default connect(mapStateToProps, {  fetchCountries, CreateNewUniversity })(AddUniversity);