import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import * as FaIcons from 'react-icons/fa';
import { InputGroup } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import styles from './permissions.module.css';
import EditPermision from './editPermisionModal';
import axios from 'axios';
import DeletePermissionModal from './deletPermission';
import {fetchPermissions, fetchPermissionsByLimit, getPermissionById} from '../../redux/reducers/permissionsReducer';
import {Constants} from '../../constatnts';
import { connect} from 'react-redux'
class Permissions extends React.Component {
  constructor(props){
    super(props);
    this.state = { showEdit: { show: false, id: 0, values: '' }, showDelete:{ show: false, id: 0, values: '' } }
  this.handleDeletShow =this.handleDeletShow.bind(this);
  }
 pageNumbers = [];

  componentDidMount(){
    this.getData();
    this.addPagination();
    console.log(this.props.roles.role)

  }

  getData(){
    this.props.fetchPermissions();
  }

  // to add pagination
  addPagination(){
 for (let i = 1; i <= Math.ceil(50/ 10); i++) {
    this.pageNumbers.push(i);
  };
}

// get users when change page
 handleChangePage = (id) => {
   this.props.fetchPermissionsByLimit(id);
  }

  // open modal to edit user
  handleShow (Id) {
    console.log(Id);
   this.props.getPermissionById(Id).then(res =>{
      if(res.data){
        this.setState({showEdit : { show: true, id: Id, values: res.data[0] }});
      } else{
        console.log(res);
      }
    });
   
  }

 columns = ["S.no", "Name", "Edit", "delete", "select"];

//  to open delet modal
  handleDeletShow (id) {
    this.setState({showDelete : {show: true, id: id}});
  }

  deleteUser = (index) => {
    this.handleDeletShow(index);
    
    console.log(index);
  }
ids =[];
handleChecked =(index) =>{
    this.ids.push(index);
    console.log(index, this.ids)
  }

  // To delete multiple users
  handleDeletAll =() =>{
    if(this.ids.length > 0){
      
     this.handleDeletShow(this.ids);
      
    }
  }
  render(){
    // this.props.fetchRoles();
  return (
    <div>
      <Button variant="primary" onClick={this.handleDeletAll}>Delete all</Button>
      <Table responsive>
        <thead>
          <tr>
            {this.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { this.props.permissions.permissions ? this.props.permissions.permissions.map((item, index) => (
            <tr key={index} onClick={() => console.log(index, item)}>
              <td>{index + 1}</td>
              <td>{item.permissionName}</td>
              {/* <td key={index} >{item.role}</td> */}
              <td><FaIcons.FaEdit onClick={() => this.handleShow(item.id)
              //  this.setState({showEdit : { show: true, id: item.Id, values: item }})
               } /></td>
              <td><FaIcons.FaTrash onClick={() => this.deleteUser(index+1)} /></td>
              <td><InputGroup.Checkbox onChange={() => this.handleChecked(index+1) }/></td>
            </tr>
          )) : ""}
        </tbody>
      </Table>
      <EditPermision history=''
        show={this.state.showEdit.show}
        onHide={() => this.setState({ showEdit : {show: false} })}
        id={this.state.showEdit.id}
        values={this.state.showEdit.values}
      />

      <DeletePermissionModal history=''
        show={this.state.showDelete.show}
        onHide={() => this.setState({showDelete : {show: false}})}
        id={this.state.showDelete.id}
        values={this.state.showDelete.values} />
      <ul id="page-numbers" className={styles.pagesList}>
        {this.pageNumbers.map((number, index) =>{
      return(<li className={styles.pages}
        key={index}
        id={number}
        onClick={() =>this.handleChangePage(number)}
      >
        {number}
      </li>)
  })
    }
      </ul>
    </div>
  )
 }
}

const mapStateToProps = state => {
  return {
    login: state.login.accessToken ? state.login.accessToken : [],
    users: state.users ? state.users :[],
    roles: state.roles ? state.roles : [],
    permissions: state.permissions ? state.permissions : []
    
  }
};
export default connect(mapStateToProps, {fetchPermissions, fetchPermissionsByLimit, getPermissionById })(Permissions);