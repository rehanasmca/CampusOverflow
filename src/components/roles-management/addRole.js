import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Classes from './allRoles.module.css';
import {fetchPermissions } from '../../redux/reducers/permissionsReducer';
import {Constants} from '../../constatnts';
import { connect} from 'react-redux';
class AddRole extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {}
    }
initialValues = {
    roleName: "",
    dateInserted: new Date(),
    dateUpdated: new Date(),
    active: true,
    deleted: false,
    permissions: []
}
componentDidMount(){
    this.getData();
  }

  getData(){
      this.props.fetchPermissions();
      console.log(this.props)
  }

   render(){
    return (
        <div className={Classes.maindiv}>
            <h1>Add New role form</h1>
            <Formik
                initialValues={this.initialValues}
                validate={values => {
                    const errors = {};
                    if (!values.roleName) {
                        errors.roleName = 'Required';
                    }
                    return errors;
                }}

                // when submit form
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values)
                    let token = this.props.login;
                    const requestOptions = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    };

                    axios.post(Constants.testBaseUrl + '/Account/CreateRoleMaster', values, { headers: requestOptions })
                        .then(response => {
                            if (response.data.data) {
                                setSubmitting(false);
                                alert("added user successfully");
                            } else if (response.data.error) {
                                alert(response.data.error);
                            }


                            console.log(response);

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
      login: state.login.accessToken ? state.login.accessToken : '',
      permissions: state.permissions ? state.permissions : []
      
    }
  };

export default connect(mapStateToProps, {fetchPermissions})(AddRole);