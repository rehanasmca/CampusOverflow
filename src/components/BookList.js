import React,{Component} from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import ToastMessage from './ToastMessage';
import axios from 'axios';

class BookList extends Component{
    
  constructor(props){
    super(props);
    this.state ={
      books : []
    };
    this.state.show=false;
  }

  //Calls itself at the mount of Component used for retrieving Data
  componentDidMount=()=>{
    axios.get("http://localhost:8080/getBookList")
    .then(response => response.data.data.bookList)
    .then((bookList)=>this.setState({books: bookList}))
  }

  //
  deleteBook = (bookId) =>{
    axios.delete("http://localhost:8080/deleteBookData/"+bookId)
    .then(response => response.data.data.status)
    .then(status => {
      if(status !== null && status !== "Failure"){
        this.setState({"show": true});
        setTimeout(()=> this.setState({'show':false}), 2000);
        this.setState({
          books: this.state.books.filter(book => book.id !== bookId)
        });
      }
      else{
        this.setState({"show": false});
      }
    });
  }

    render=()=>{
        return <div className="bg-dark text-white">
        <h1>Available List of Books at our Book Shop</h1>
        <div style={{"display":this.state.show ? "block" : "none"}}>
          <ToastMessage show= {this.state.show} message={"Book Deleted Successfully."} type={"danger"}/>
        </div>
        <Card className="border border-dark bg-dark text-white center">
          <Card.Header><FontAwesomeIcon icon={faList} /> Book List</Card.Header>
          <Card.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Author</th>
                <th>Book Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.length === 0 ?
                <tr align="center">
                  <td colSpan="6">No Data Available</td>
                </tr>
                :
                this.state.books.map((book)=>(
                  <tr key={book.id}>
                    <td>{book.author}</td>
                    <td>{book.bookName}</td>
                    <td>{book.price}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={"edit/"+book.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{''}
                        <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>{''}
                      </ButtonGroup>
                    </td>
                </tr>
                ))
              }
            </tbody>
          </Table>
          </Card.Body>
        </Card>
      </div>
    }
}

export default BookList;