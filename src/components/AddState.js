import React,{Component} from 'react';
import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import ToastMessage from './ToastMessage';
import axios from 'axios';

class AddBook extends Component{

    constructor(props){
      super(props);
      this.state=this.initialState;
      this.state.show=false;
      this.submitBook = this.submitBook.bind(this);
      this.dataChanged = this.dataChanged.bind(this);
    }

    initialState = {
      id:'', authorName:'', bookName:'', price:''
    };

    componentDidMount(){
      const bookId= +this.props.match.params.id;
      if(bookId){
        this.extractBookById(bookId);
      }
    };

    //Function extract the book by id
    extractBookById =(bookId) =>{
      axios.get("http://localhost:8080/getBookListById/"+bookId)
        .then(response => {
          if(response.data.data !== null){
            this.setState({
              id: response.data.data.id, 
              authorName: response.data.data.author, 
              bookName: response.data.data.bookName, 
              price: response.data.data.price
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //This function is used to save the Books.......
    submitBook = event =>{
      event.preventDefault();

      const book ={
        author: this.state.authorName,
        book: this.state.bookName,
        price: this.state.price
      };
      
      axios.post("http://localhost:8080/insertNewBookData",book)
      .then(response => response.data.data.status)
      .then(status => {
        if(status !== null && status !== "Failure"){
          this.setState({"show": true, "linkType":"save"});
          setTimeout(()=> this.setState({'show':false}), 2000);
        }
        else{
          this.setState({"show": false});
        }
      });
      this.setState(() => this.initialState);
    };

    //Used to update the book....
    updateBook = event =>{
      event.preventDefault();

      const book ={
        id: this.state.id,
        author: this.state.authorName,
        book: this.state.bookName,
        price: this.state.price
      };
      
      axios.post("http://localhost:8080/updateBookData",book)
      .then(response => response.data.data.status)
      .then(status => {
        if(status !== null && status !== "Failure"){
          this.setState({"show": true, "linkType":"update"});
          setTimeout(()=> this.setState({'show':false}), 2000);
          setTimeout(()=> this.bookList(), 2000);
        }
        else{
          this.setState({"show": false});
        }
      });
      this.setState(() => this.initialState);
    };

    resetBook = () =>{
      this.setState(() => this.initialState);
    };

    dataChanged = event =>{
      this.setState({
        [event.target.name]:event.target.value
      });
    };

    //Links to the book List Page.........
    bookList = () =>{
      return this.props.history.push("/list");
    };

    render=()=>{
        const{authorName, bookName, price}=this.state;

        return <div className="bg-dark text-white">
        <h1>{this.state.id ? "Update Entry for Old Book":"Create Entry for New Book"}</h1>
        <div style={{"display":this.state.show ? "block" : "none"}}>
          <ToastMessage show= {this.state.show} message= {this.state.linkType === "save" ? "Book Saved Successfully.":"Book Updated Successfully."} type={"success"}/>
        </div>
        <Card className="border border-dark bg-dark text-white center">
          <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Book of your Book Shop":"Add Book to your Book Shop"}</Card.Header>
          <Form id="bookFormId" onSubmit={this.state.id ? this.updateBook : this.submitBook} onReset={this.resetBook}>
          <Card.Body> 
              <Form.Row>
                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="authorName" type="test" 
                  value={authorName}
                  onChange={this.dataChanged}
                  placeholder="Enter Author Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBookName">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="bookName" type="test" 
                  value={bookName}
                  onChange={this.dataChanged}
                  placeholder="Enter Book Name" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control className="bg-dark text-white" required
                  name="price" type="test" 
                  value={price}
                  onChange={this.dataChanged}
                  placeholder="Enter Price in Rupees" />
                </Form.Group>
              </Form.Row>
          </Card.Body>
          <Card.Footer style={{"textAlign":"right"}}>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update":"Save"}
            </Button>{' '}
            <Button variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>{' '}
            <Button variant="info" type="button" onClick={this.bookList.bind()}>
              <FontAwesomeIcon icon={faList} /> Book List
            </Button>
          </Card.Footer>
          </Form>
        </Card>
      </div>
    }
}

export default AddBook;