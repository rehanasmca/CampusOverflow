import React from 'react';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Classes from './rolMapPermissions.module.css';
import { fetchRoles, fetchPermissionsByRoleId, setPermissionsByRoleId } from '../../redux/reducers/rolesReducer';
import { fetchPermissions } from '../../redux/reducers/permissionsReducer';
import { connect } from 'react-redux';
class RoleMapPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { roleId: 1, permissions: [], permissionIds: [] }
        this.saveRoleMapPermission = this.saveRoleMapPermission.bind(this)
    }
    componentDidMount() {
        this.getData();
        this.props.fetchPermissionsByRoleId(1).then(res => {
            if (res.data) {
                console.log(res.data)
                this.setState({ permissions: res.data })
            } else {
                console.log("error")
            }
        })
    }

    saveRoleMapPermission() {
        let data ={
            roleId: this.state.roleId,
            permissionIds: this.state.permissionIds
        }
        this.props.setPermissionsByRoleId(data).then(res => {
            console.log(res);
            if (res.data) {
                console.log(res);
            }
        })
    }

    getData() {
        this.props.fetchRoles();
        this.props.fetchPermissions();
    }
    render() {
        return (
            <div className={Classes.maindiv}>
                <Formik
                    initialValues={{ roleId: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.roleId) {
                            errors.roleId = 'Required';
                        }
                        return errors;
                    }}
                    // when submit form
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        // this.props.CreateNewCountry(values).then(res => {
                        //     if (res.data) {
                        //         setSubmitting(false);
                        //         this.props.fetchCountries();
                        //     } else {
                        //         console.log("error");
                        //     }
                        // });
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

                            <Form.Group controlId="exampleForm.ControlSelect1" className={Classes.formInput}>
                                <Form.Label>Select Role</Form.Label>
                                <Form.Control as="select"
                                    name="roleId"
                                    onChange={
                                        (e) => {
                                            e.persist = () => { }
                                            handleChange(e)
                                            this.setState({roleId : e.target.value})
                                            console.log(e.target.value)
                                            this.props.fetchPermissionsByRoleId(e.target.value).then(res => {
                                                if (res.data) {
                                                    console.log(res.data)
                                                    this.setState({ permissions: res.data })
                                                } else {
                                                    console.log("error")
                                                }
                                            })

                                        }
                                    }
                                    onBlur={handleBlur}
                                    value={values.roleId} className={Classes.formInput}>
                                    {this.props.roles.roles ? this.props.roles.roles.map((item, index) => <option value={item.id}>{item.roleName}</option>) : ''}
                                </Form.Control>
                                <Form.Text className="text-muted">
                                    {errors.roleId && touched.roleId && errors.roleId}
                                </Form.Text>
                            </Form.Group>
                            {/* {this.state.permissions ? this.state.permissions.map((item, index) =>
                                <Form.Check
                                    checked={this.state.permissions.find(({ id }) => id === item.id)
                                        ? true : false}
                                    type='checkbox'
                                    label={item.permissionName}
                                    id={item.id}
                                    key={index}
                                    onChange={(event) => {
                                        if (event.target.checked == true) {
                                            this.setState({ permissionIds: [...this.state.permissionIds, item.id], permissions: [...this.state.permissions, item] })

                                        } else {
                                            var index = this.state.permissions.findIndex((permission) => permission.id === item.id
                                            );
                                            if (index > -1) {
                                                this.state.permissions.splice(index, 1);
                                            }

                                        }

                                    }}
                                />
                            ) : ""} */}
                            {this.props.permissions.permissions ? this.props.permissions.permissions.map((item, index) =>
                                <Form.Check
                                    checked={this.state.permissions.find(({ id }) => id === item.id)
                                        ? true : false}
                                    type='checkbox'
                                    label={item.permissionName}
                                    id={item.id}
                                    key={index}
                                    onChange={(event) => {
                                        if (event.target.checked == true) {
                                            this.setState({ permissionIds: [...this.state.permissionIds, item.id], permissions: [...this.state.permissions, item] })

                                        } else {
                                            var index = this.state.permissions.findIndex((permission) => permission.id === item.id
                                            );
                                            if (index > -1) {
                                                this.state.permissions.splice(index, 1);
                                            }

                                        }

                                    }}
                                />
                            ) : ""}
                            <Button type="submit" disabled={isSubmitting} variant="primary" onClick={this.saveRoleMapPermission}>Save</Button>
                        </Form>

                    )}
                </Formik>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        login: state.login.accessToken ? state.login.accessToken : [],
        roles: state.roles ? state.roles : [],
        permissions: state.permissions ? state.permissions : []

    }
};
export default connect(mapStateToProps, { setPermissionsByRoleId, fetchPermissions, fetchRoles, fetchPermissionsByRoleId })(RoleMapPermissions);