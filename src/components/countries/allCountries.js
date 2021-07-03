import React from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import EditCountries from './editCountries';
import styles from './countries.module.css';
import DeleteCountry from './deleteCountry';
import { fetchCountries, fetchUsersByLimit, getCountryById } from '../../redux/reducers/countriesReducer';
import { connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Countries extends React.Component {
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
    this.props.fetchCountries();
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
    this.props.getCountryById(Id).then(res =>{
      console.log(res);
      if(res.data.data){
        toast.success("get course success");
        this.setState({showEdit : { show: true, id: Id, values: res.data[0] }});
      } else {
        toast.error(res)
      }
      
      
    })
     
    // const requestOptions = {
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + token
    // };
    // axios.get( Constants.testBaseUrl +`/Account/GetUserMasterByIdAsync/?id=${Id}`, { headers: requestOptions })
    //   .then(response => {
    //     if (response.data.data) {
    //       this.setState({showEdit : { show: true, id: Id, values: response.data.data[0] }});
    //     } else if (response.data.error) {
    //       alert(response.data.error);
    //     }
    //   })
  }

 columns = ["S.no", "Name", "Edit country", "delete", "select"];

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
          {this.props.countries.countries.map((item, index) => (
            <tr key={index} onClick={() => console.log(index, item)}>
              <td>{index + 1}</td>
              <td>{item.countryName}</td>
              <td><FaIcons.FaEdit onClick={() => this.handleShow(index + 1)} /></td>
              <td><FaIcons.FaTrash onClick={() => this.deleteUser(index+1)} /></td>
              <td><InputGroup.Checkbox onChange={() => this.handleChecked(index+1) }/></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditCountries history=''
        show={this.state.showEdit.show}
        onHide={() => this.setState({ showEdit : {show: false} })}
        id={this.state.showEdit.id}
        values={this.state.showEdit.values}
      />

      <DeleteCountry history=''
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
    login: state.login.accessToken ? state.login.accessToken : [],
    countries: state.countries ? state.countries :[]
    
  }
};
export default connect(mapStateToProps, {fetchCountries, fetchUsersByLimit, getCountryById })(Countries);