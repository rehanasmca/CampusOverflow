import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Edituser from './edituser';
import styles from './users.module.css';
import axios from 'axios';
import DeleteModal from './deleteModal';
import { fetchUsers, fetchUsersByLimit } from '../../redux/reducers/usersReducer';
import {Constants} from '../../constatnts';
import { connect} from 'react-redux'
class Users extends React.Component {
  constructor(props){
    super(props);
    this.state = { showEdit: { show: false, id: 0, values: '' }, showDelete:{ show: false, id: 0, values: '' } }
  this.handleDeletShow =this.handleDeletShow.bind(this);
  }
 pageNumbers = [];

  componentDidMount(){
    this.getData();
    this.addPagination();

  }

  getData(){
    this.props.fetchUsers();
  }

  // to add pagination
  addPagination(){
 for (let i = 1; i <= Math.ceil(50/ 10); i++) {
    this.pageNumbers.push(i);
  };
}

// get users when change page
 handleChangePage = (id) => {
   this.props.fetchUsersByLimit(id);
  }

  // open modal to edit user
  handleShow (Id) {
    console.log(Id);
    let token = this.state.login;
    const requestOptions = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    axios.get( Constants.testBaseUrl +`/Account/GetUserMasterByIdAsync/?id=${Id}`, { headers: requestOptions })
      .then(response => {
        if (response.data.data) {
          this.setState({showEdit : { show: true, id: Id, values: response.data.data[0] }});
        } else if (response.data.error) {
          alert(response.data.error);
        }
      })
  }

 columns = ["S.no", "Name", "Edit user", "delete", "select"];

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
          {this.props.users.users.map((item, index) => (
            <tr key={index} onClick={() => console.log(index, item)}>
              <td>{index + 1}</td>
              <td>{item.userName}</td>
              {/* <td key={index} >{item.role}</td> */}
              <td><FaIcons.FaEdit onClick={() => this.handleShow(index + 1)} /></td>
              <td><FaIcons.FaTrash onClick={() => this.deleteUser(index+1)} /></td>
              <td><InputGroup.Checkbox onChange={() => this.handleChecked(index+1) }/></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Edituser history=''
        show={this.state.showEdit.show}
        onHide={() => this.setState({ showEdit : {show: false} })}
        id={this.state.showEdit.id}
        values={this.state.showEdit.values}
      />

      <DeleteModal history=''
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
    users: state.users ? state.users :[]
    
  }
};
export default connect(mapStateToProps, {fetchUsers, fetchUsersByLimit })(Users);