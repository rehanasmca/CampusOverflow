import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Classes from './mailing.module.css';

class BlogTemplate extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    getData = () => {
        fetch('bologData.json'
          , {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
          .then(function (response) {
            console.log(response)
            return response.json();
          })
          .then((myJson) => {
            console.log(myJson);
            this.setState({ value: myJson });
          });
      }
    
      
      componentDidMount() {
        this.getData();
       
      }

    render(){
        return(
            <div className={Classes.mainDiv}>
                <h1>{this.state.value ? this.state.value.mainheading : ''}</h1>
               <div>
                   <h5>{this.state.value ? this.state.value.mainConcept.heading : ''}</h5>
                <p>{this.state.value ? this.state.value.mainConcept.content.replace("\\n", " ") : ''}</p>
                {this.state.value && this.state.value.mainConcept.image ? <img src={this.state.value.mainConcept.image} /> : ''}
               </div>
               
               {this.state.value && this.state.value.subConcept ? Object.keys(this.state.value.subConcept).map((item, index) =><div key={index}>
               <h5>{this.state.value.subConcept[item].subHeading}</h5>
               <p>{this.state.value.subConcept[item].content}</p>
               {this.state.value.subConcept[item].image? <img src={this.state.value.subConcept[item].image} /> : ''}
               </div>) : ''}
               <h5>Reference links</h5>
               {this.state.value && this.state.value.links ? Object.keys(this.state.value.links).map((item, index) =><div key={index}>
              
               <a href={this.state.value.links[item]}>{this.state.value.links[item]}</a>
                </div>) : ''}

            </div>
        )
    }
}

export default BlogTemplate;