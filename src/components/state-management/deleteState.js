import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect} from 'react-redux';
import {deleteStateByID, fetchStates} from '../../redux/reducers/statesReducer';

class DeleteState extends Component {
  constructor(props){
    super(props);
    this.state= {};
     console.log(props);
     this.handleClose = this.handleClose.bind(this);
     this.handleDeleteClick = this.handleDeleteClick.bind(this)
}
    handleClose =()=>{
        this.props.onHide();
    }
   handleDeleteClick =(id) =>{
        console.log(id);
        this.props.deleteStateByID(id).then(res => {
          if (res.data) {
              this.props.fetchStates();
              this.handleClose();
          } else {
              console.log("error")
          }
      });
    }

    render(){
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete state {typeof(this.props.id) == "object" ? this.props.id.map(item =>item) : this.props.id } 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <p>Are you sure to delete this state?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() =>
            {typeof(this.props.id) == "object" ? this.props.id.map(item =>this.handleDeleteClick(item)) :  this.handleDeleteClick(this.props.id)
               
          }}>Delete</Button>
          <Button onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = state =>{
  return {
    login: state.login ? state.login.accessToken : '',
    }
}
  export default connect(mapStateToProps, {deleteStateByID, fetchStates})(DeleteState);
 