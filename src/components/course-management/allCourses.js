import React from 'react';
import Table from 'react-bootstrap/Table';
import { InputGroup } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import EditCourse from './editCourse';
import styles from './courses.module.css';
import DeleteCourse from './deleteCourse';
import { fetchCourses, fetchcoursesByLimit, getCourseById } from '../../redux/reducers/coursesReducer';
import { connect} from 'react-redux'
class AllCourses extends React.Component {
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
    this.props.fetchCourses();
  }

  // to add pagination
  addPagination(){
 for (let i = 1; i <= Math.ceil(50/ 10); i++) {
    this.pageNumbers.push(i);
  };
}

// get users when change page
 handleChangePage = (id) => {
   this.props.fetchcoursesByLimit(id);
  }

  // open modal to edit country
  handleShow (Id) {
    console.log(Id);
    let token = this.state.login;
    this.props.getCourseById(Id).then(res =>{
      console.log(res);
        this.setState({showEdit : { show: true, id: Id, values: res.data[0] }});
      
    })
  }

 columns = ["S.no", "Name","abbrevation", "Edit", "delete", "select"];

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
          {this.props.courses.courses.map((item, index) => (
            <tr key={index} onClick={() => console.log(index, item)}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.abbreviation}</td>
              <td><FaIcons.FaEdit onClick={() => this.handleShow(index + 1)} /></td>
              <td><FaIcons.FaTrash onClick={() => this.deleteUser(index+1)} /></td>
              <td><InputGroup.Checkbox onChange={() => this.handleChecked(index+1) }/></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <EditCourse history=''
        show={this.state.showEdit.show}
        onHide={() => this.setState({ showEdit : {show: false} })}
        id={this.state.showEdit.id}
        values={this.state.showEdit.values}
      />

      <DeleteCourse history=''
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
    courses: state.courses ? state.courses :[]
    
  }
};
export default connect(mapStateToProps, {fetchCourses, fetchcoursesByLimit, getCourseById })(AllCourses);