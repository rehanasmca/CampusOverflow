import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Classes from './university.module.css';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { fetchCountries } from '../../redux/reducers/countriesReducer';
import { updateUniversityValues, fetchUniversities } from '../../redux/reducers/universityReducer';
class EditUniversity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
       
    }
    handleClose =()=>{
        this.props.onHide();
    }
    componentDidMount() {
        this.props.fetchCountries();
    }

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
                            Edit Country{this.props.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={this.props.values}
                            validationSchema={this.validationSchema}
                
                            onSubmit={(values, { setSubmitting }) => {
                                let universityValues = {
                                    id: values.id ? values.id : '',
                                    universityName: values.universityName ? values.universityName : '',
                                    countryId: values.countryId ? values.countryId : '' ,
                                    universityTypeId: values.universityTypeId ? values.universityTypeId : '' ,
                                    establishedYear: values.establishedYear ? values.establishedYear : '',
                                    universityLink: values.universityLink ? values.universityLink : '' ,
                                    isRecommended: values.isRecommended ? values.isRecommended : '',
                                    isFeatured: values.isFeatured ? values.isFeatured : '',
                                    metaKeyWords: values.metaKeyWords ? values.metaKeyWords : '',
                                    metaDescription: values.metaDescription ? values.metaDescription : '',
                                    metaTitle: values.metaTitle ? values.metaTitle : '',
                                    dateInserted: values.dateInserted ? values.dateInserted : '',
                                    dateUpdated: new Date(),
                                    active: values.active ? values.active : true,
                                    deleted:values.deleted ? values.deleted : false
                                };
                                setSubmitting(false);
                                this.props.updateUniversityValues(universityValues).then(res => {
                                    if (res.data) {
                                        this.props.fetchUniversities();
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
                            <Form.Label>University Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="universityName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityName} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.universityName && touched.universityName && errors.universityName}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>University Type Id</Form.Label>
                            <Form.Control
                                type="text"
                                name="universityTypeId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityTypeId} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.universityTypeId && touched.universityTypeId && errors.universityTypeId}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Established Year</Form.Label>
                            <Form.Control
                                type="date"
                                name="establishedYear"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.establishedYear} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.establishedYear && touched.establishedYear && errors.establishedYear}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>University Link</Form.Label>
                            <Form.Control
                                type="text"
                                name="universityLink"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.universityLink} className={Classes.formInput} />
                            <Form.Text className="text-muted">
                                {errors.universityLink && touched.universityLink && errors.universityLink}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Meta Key words</Form.Label>
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
        countries: state.countries ? state.countries : []

    }
};
export default connect(mapStateToProps  , { updateUniversityValues, fetchUniversities, fetchCountries })(EditUniversity);