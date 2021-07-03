import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { Constants } from '../../constatnts';
import axios from 'axios';
function DeletePermissionModal(props) {
    const handleClose =()=>{
        props.onHide();
    }
    const users = useSelector((state) => state);
    const handleDeleteClick =(id) =>{
        console.log(id);
        let t =JSON.parse(localStorage.getItem("userData"))
    let token = t.accessToken;
    const requestOptions = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    axios.post(Constants.testBaseUrl +`/Account/DeletePermissionMaster/${id}`, { headers: requestOptions })
        .then(response => {
            if (response.data.data) {
                alert("added user successfully");
            } else if (response.data.error) {
                alert(response.data.error);
            }


            console.log(response);
            handleClose();

        })
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete permission {typeof(props.id) == "object" ? props.id.map(item =>item) : props.id } 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>Are you sure to delete this permission?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() =>
            {typeof(props.id) == "object" ? props.id.map(item =>handleDeleteClick(item)) :  handleDeleteClick(props.id)
               
          }}>Delete</Button>
          <Button onClick={props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
   
  export default DeletePermissionModal;
 