import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Classes from './allRoles.module.css';
import { Constants } from '../../constatnts';
import {fetchPermissions} from '../../redux/reducers/permissionsReducer';
import {connect} from 'react-redux';
class EditRole extends React.Component {
    constructor(props){
        super(props)

    }
    componentDidMount(){
        this.props.fetchPermissions();
    }
   render(){
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
                        Edit Role{this.props.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={this.props.values}
                        validate={values => {
                            const errors = {};
                            if (!values.roleName) {
                                errors.roleName = 'Required';
                            } 

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values)
                            let t = JSON.parse(localStorage.getItem("userData"));
                            let token = t.accessToken;
                            const requestOptions = {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            };
                            axios.post(Constants.testBaseUrl + '/Account/UpdateRoleMaster', values, { headers: requestOptions })
                                .then(response => {
                                    if (response.data.data) {
                                        setSubmitting(false);
                                        alert("changed user detsils successfully");
                                        this.props.onHide();
                                    } else if (response.data.error) {
                                        alert(response.data.error);
                                    }
                                })
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
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control
                                        type="string"
                                        name="roleName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.roleName} className={Classes.formInput} />
                                    <Form.Text className="text-muted">
                                        {errors.roleName && touched.roleName && errors.roleName}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Label>Choose permissions</Form.Label>
                        {this.props.permissions.permissions.map((item, index) =>
                        <Form.Check
                            type='checkbox'
                            label={item.permissionName}
                            id={item.id}
                            key={index}

                            onChange={(event) => {
                                if(event.target.checked == true){
                                    values.permissions.push(item.id);
                                } else {
                                    var index = values.permissions.indexOf(item.id);
                                    if (index > -1) {
                                        values.permissions.splice(index, 1);
                                    }
                                    
                                }
                                
                            }}
                        /> 
                        ) }
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
const mapStateToProps = state =>{
return {
    permissions: state.permissions ? state.permissions : []
}
}

export default connect(mapStateToProps, {fetchPermissions})(EditRole);