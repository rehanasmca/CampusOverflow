import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Classes from './mailing.module.css';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';

class MailingTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", users: "", selectedTemplate: "", selectedUser:''}
  }

  getData = () => {
    fetch('jobsDeedPage.json'
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
    fetch('users.json'
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
        this.setState({ users: myJson });
      });
  }


  componentDidMount() {
    this.getData();

  }

  render() {
    return (
      <div className={Classes.mainDiv}>
        <Formik
          initialValues={{template: "", user: ""}}
          // validationSchema={this.validationSchema}
          // when submit form
          onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
               
             
           
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (

            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Select template</Form.Label>
                <Form.Control as="select"
                  name="template"
                  onChange={(e)=>{
                    e.persist = () => { }
                    handleChange(e)
                    console.log(e.target.value);
                    this.setState({selectedTemplate: e.target.value});
                   
                  }}
                  onBlur={handleBlur}
                  value={values.template}
                  >
                    {this.state.value ? Object.keys(this.state.value.templates).map((item, index) => <option value={item}>{item}</option>) : ''}
                            
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Select user</Form.Label>
                <Form.Control as="select"
                  name="user"
                  onChange={(e)=> {
                    e.persist = () => { }
                    handleChange(e)
                    console.log(e.target.value);
                    this.setState({selectedUser: e.target.value});
                   
                 
                  }}
                  onBlur={handleBlur}
                  value={values.user}
                  >
                    {this.state.users ? Object.keys(this.state.users).map((item, index) => <option value={item}>{item}</option>) : ''}
                            
                  </Form.Control>
                
              </Form.Group>
            </Form>

          )}
        </Formik>
        <div className={Classes.header}>
          <img src={this.state.value ? this.state.value.Header.image : ''} alt="no image" />
          <h1>{this.state.value ? this.state.value.Header.Company : ''}</h1>
          <div>
            {this.state.value ? Object.keys(this.state.value.Header.address).map(item => <p className={Classes.address}><b>{this.state.value.Header.address[item]}</b></p>) : ''}
          </div>
        </div>
        <div>
          <h5 className={Classes.inLine}>Subject : </h5> <h6 className={Classes.inLine}>{this.state.value ? this.state.value.templates.confirmation.subject : ''}</h6>
          <p >{this.state.value ? this.state.value.templates.confirmation.wish : ''} <span><b>{this.state.users ? this.state.users[1].name : ""}</b></span></p>
          {this.state.value ? this.state.value.templates.confirmation.details.split("\\n").map((str, index) => <p key={index}>{str.replace("[link]", (this.state.users ? this.state.users[1].link : ''))
          .replace("[name]", (this.state.users ? this.state.users[1].name : ''))
          .replace("[password]",(this.state.users ? this.state.users[1].password : '') )}</p>) : ''}
         </div>
        {this.state.value?  <div dangerouslySetInnerHTML={ { __html:JSON.stringify(this.state.value.templates.confirmation.html )} }></div>
      : ''}
        <div className={Classes.footer}>
          <p className={Classes.address}>{this.state.value ? this.state.value.footer.name : ''}</p>
          <p className={Classes.address}>{this.state.value ? this.state.value.footer.designation : ''}</p>
          <p className={Classes.address}>{this.state.value ? this.state.value.footer.company : ''}</p>
        </div>
      </div>
    )
  }
}

export default MailingTemplate;
