import React from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import EditEmail from './editEmail';
import styles from './email.module.css';
import DeleteEmail from './deleteEmail';
import { fetchEmails, getEmailById } from '../../redux/reducers/emailReducer';
import { connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AllEmails  extends React.Component {
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
    this.props.fetchEmails();
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

  // open modal to edit country
  handleShow (Id) {
    console.log(Id);
    let token = this.state.login;
    this.props.getEmailById(Id).then(res =>{
      console.log(res);
      if(res.data){
        toast.success("get email success");
        this.setState({showEdit : { show: true, id: Id, values: res.data[0] }});
      } else {
        toast.error(res)
      }
      
      
    })
  }

 columns = ["S.no", "Name","Email", "Edit country", "delete", "select"];

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
        {this.props.emails.emails ? this.props.emails.emails.map((item, index) => (
           <tr key={index} onClick={() => console.log(index, item)}>
              <td>{index + 1}</td>
              <td>{item.displayName}</td>
              <td>{item.email}</td>
              <td><FaIcons.FaEdit onClick={() => this.handleShow(item.id)} /></td>
              <td><FaIcons.FaTrash onClick={() => this.deleteUser(item.id)} /></td>
              <td><InputGroup.Checkbox onChange={() => this.handleChecked(item.id) }/></td>
            </tr>
          )) : ''}
        </tbody>
      </Table>
      <EditEmail history=''
        show={this.state.showEdit.show}
        onHide={() => this.setState({ showEdit : {show: false} })}
        id={this.state.showEdit.id}
        values={this.state.showEdit.values}
      />

      <DeleteEmail history=''
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
      <ToastContainer />
    </div>
  )
 }
}

const mapStateToProps = state => {
  return {
    emails: state.emails ? state.emails :[]
   
  }
};
export default connect(mapStateToProps, {fetchEmails, getEmailById })(AllEmails);